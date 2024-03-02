import cv2
import math
import numpy as np
from Creds import *
from PIL import Image
from ftplib import FTP
from io import BytesIO
from base64 import b64decode

global registeredImage


def CropImage(capturedImage):
    indices = np.where(capturedImage != [0])
    leftMostEdge = min(indices[1])
    rightMostEdge = max(indices[1])
    topMostEdge = min(indices[0])
    bottomMostEdge = max(indices[0])
    croppedImage = capturedImage[topMostEdge:bottomMostEdge, leftMostEdge:rightMostEdge]
    return croppedImage


def CannyThreshold(capturedImage):
    median = np.median(capturedImage)
    lowerThreshold = max(0, (0.7 * median))
    upperThreshold = min(255, (0.7 * median))
    CannyEdged = cv2.Canny(capturedImage, lowerThreshold, upperThreshold)
    return CannyEdged


def CalculateStrokeLength(image):
    length = len(np.where(image != [0])[0])
    return length


def CalculateCurvature(x1, y1, x2, y2):
    dx = x2 - x1
    dy = y2 - y1
    if dx == 0:
        return float("inf")
    return abs(dy / dx)


def FindFeatures(image):
    lines = cv2.HoughLinesP(
        image, 1, np.pi / 180, threshold=50, minLineLength=10, maxLineGap=10
    )
    features = []
    for line in lines:
        for x1, y1, x2, y2 in line:
            curvature = CalculateCurvature(x1, y1, x2, y2)
            angle = math.atan2(y2 - y1, x2 - x1)
            features.append([curvature, angle])
    return features


def CompareStrokeLengths(lenght1, lenght2):
    lengthDifference = (abs(lenght1 - lenght2) / max(lenght1, lenght2)) * 100
    return lengthDifference


def CompareFeaturs(features1, features2, angleThreshold=0.1, curvatureThreshold=0.5):
    maxFeatures = max(len(features1), len(features2))
    featuresMatched = 0
    if maxFeatures != len(features1):
        for _ in range(maxFeatures - len(features1)):
            features1.append([0, 0])
    if maxFeatures != len(features2):
        for _ in range(maxFeatures - len(features2)):
            features2.append([0, 0])
    angleDifferences = []
    curvatureDifferences = []
    for i in range(maxFeatures):
        f1 = features1[i]
        f2 = features2[i]
        curvatureDifference = abs(f1[0] - f2[0])
        angleDifference = abs(f1[1] - f2[1])
        angleDifferences.append(angleDifference)
        curvatureDifferences.append(curvatureDifference)

    angleThreshold = np.average(angleDifferences)
    curvatureThreshold = np.average(curvatureDifferences)
    for angleDifference, curvatureDifference in zip(
        angleDifferences, curvatureDifferences
    ):
        if (
            curvatureDifference < curvatureThreshold
            and angleDifference < angleThreshold
        ):
            featuresMatched += 1

    percentageDifference = (abs(maxFeatures - featuresMatched) / maxFeatures) * 100

    return percentageDifference


def ComputePixelMatch(image1, image2):
    count = 0
    Tcount = 0
    if image1.shape > image2.shape:
        for i in range(len(image2[0])):
            for j in range(len(image2[1])):
                try:
                    if image1[i][j] == image2[i][j]:
                        count += 1
                except:
                    Tcount += 1
                    break
                Tcount += 1
    else:
        for i in range(len(image1[0])):
            for j in range(len(image1[1])):
                try:
                    if image1[i][j] == image2[i][j]:
                        count += 1
                except:
                    Tcount += 1
                    break
                Tcount += 1

    percent = (abs(Tcount - count) / Tcount) * 100
    return percent


def CompareImages(image1, image2):
    length1 = CalculateStrokeLength(image1)
    length2 = CalculateStrokeLength(image2)
    lengthDifference = CompareStrokeLengths(length1, length2)
    if lengthDifference < 20:
        features1 = FindFeatures(image1)
        features2 = FindFeatures(image2)
        featureDifference = CompareFeaturs(features1, features2)
        if featureDifference < 40:
            pixelMatchDifference = ComputePixelMatch(image1, image2)
            if pixelMatchDifference < 20:
                return {
                    "success": True,
                    "match": f" pixelMatch: {100 - pixelMatchDifference}, featuresMatch: {100 - featureDifference}, strokeMatch: {100 - lengthDifference}",
                }
            else:
                return {
                    "success": False,
                    "error": f" pixelMatch: {100 - pixelMatchDifference}, featuresMatch: {100 - featureDifference}, strokeMatch: {100 - lengthDifference}",
                
                }
        else:
            return {
                "success": False,
                "error": f" pixelMatch: 0, featuresMatch: {100 - featureDifference}, strokeMatch: {100 - lengthDifference}",
                
            }

    else:
        return {
            "success": False,
            "error": f" pixelMatch: 0, featuresMatch:0, strokeMatch: {100 - lengthDifference}",
                
        }

def BytestoNumpy(data, isFTP=True):
    if isFTP:
        global registeredImage
        registeredImage = np.array(Image.open(BytesIO(data)))
    else:
        _, encoded = data.split(",", 1)
        decodedData = b64decode(encoded)
        return np.array(Image.open(BytesIO(decodedData)))


def UploadImagetoFTP(image, fileName):
    try:
        ftp = FTP(FTP_SERVER)
        ftp.login(FTP_USER, FTP_PASSWORD)

    except Exception as e:
        return {"success": False, "error": str(e)}

    isSuccess, buffer = cv2.imencode(".jpg", image)
    if not isSuccess:
        return {"success": False, "error": "Could not convert image to byte stream"}

    try:
        byte_stream = BytesIO(buffer)
        ftp.storbinary(f"STOR {fileName}", byte_stream)
        ftp.quit()
        return {"success": True}

    except Exception as e:
        ftp.quit()
        return {"success": False, "error": str(e)}


def GetImagefromFTP(fileName):
    try:
        ftp = FTP(FTP_SERVER, timeout=None, source_address=None)
        ftp.login(FTP_USER, FTP_PASSWORD)
    except Exception as e:
        return {"success": False, "error": str(e)}

    try:
        ftp.retrbinary("RETR " + fileName, BytestoNumpy)
        ftp.quit()
        return {"success": True}

    except Exception as e:
        ftp.quit()
        return {"success": False, "error": str(e)}

