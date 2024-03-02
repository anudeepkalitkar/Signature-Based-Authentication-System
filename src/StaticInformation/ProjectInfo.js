const ProjectInfo = {
	title: "Signature Based Authentication System",
	coverImage: "Images/SBAS.webp",
	intro: `Navigating a transformative shift in the world of digital authentication, the Image Similarity Based Authentication System presents an innovative paradigm. This system permits users to authenticate themselves by drawing an image, which is then cross-verified with their registration sketch, completely bypassing the need for traditional text-based passwords. Marrying the strengths of visual memory with modern tech, the system leverages HTML, CSS, and JS for its frontend, while Python, augmented with OpenCV, powers the backend.`,
		description: `Existing System:
		Predominantly, the digital authentication world relies heavily on the conventional duo of email and password. While some avant-garde platforms have dabbled with biometrics and smart cards, they come with their own set of challenges:

		Cost Implications: Biometrics or smart card solutions often entail specialized hardware or software, raising affordability and feasibility concerns.

		Everyday Usability: Although technologically superior, the day-to-day practicality and accessibility for general users of such advanced systems remain questionable.

		Proposed Image Similarity Based Authentication System:
		Stepping away from convention, this system introduces a fresh, user-centric approach to digital security:

		Canvas for User’s Unique Mark:

		On registration, users are greeted with a canvas, a space dedicated for them to craft a personal doodle or sketch.
		Conversion and Encryption:

		Once crafted, this sketch is converted into an image format, ensuring optimal digital compatibility.
		Prior to storing on the server, the image undergoes a robust encryption process, safeguarding the user's unique visual password.
		Image Verification using OpenCV:

		At the authentication stage, users redraw their initial sketch on the canvas.
		Python’s OpenCV module springs into action, comparing this fresh sketch with the stored, encrypted image from registration.
		A stringent criterion has been set: only if the newly drawn image boasts an 80% or higher match with the original is the user authenticated, ensuring tight security.
		Tech Stack:

		The frontend, which presents the canvas and handles user interaction, is constructed using HTML, CSS, and JavaScript. In contrast, the backend, responsible for image processing, comparison, and storage, is efficiently managed by Python coupled with the OpenCV library.
		To encapsulate, the Image Similarity Based Authentication System is a vanguard in digital access, blending the innate human proclivity for visuals with cutting-edge technology. As the digital landscape continues to expand, such intuitive and personalized systems herald a future where security is both stringent and user-friendly.`,
		link: "https://anudeepkalitkar.github.io/Image-Based-Authentication-System-Signature/",
		urlname: "IBASSimilarity",
		tools: ["Python", "HTML", "CSS", "JS", "Php"],
		sourceCode:
			"https://github.com/anudeepkalitkar/Image-Based-Authentication-System-Signature",
	

};

export { ProjectInfo };
