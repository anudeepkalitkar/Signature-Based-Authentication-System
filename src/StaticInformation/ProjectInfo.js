const ProjectInfo = {
	title: "Image Based Authentication System",
	coverImage: "Images/IBAS-Icons.jpg",
	intro: "Break away from the constraints of traditional alphanumeric passwords, checkout this  novel, intuitive way for users to secure their credentials. ",
	description: `Existing System:
		The landscape of digital authentication has been predominantly dominated by the standard email-password combination. Some platforms have ventured into advanced mechanisms like biometrics or smart cards. However, while they do offer heightened security, concerns arise:

		Cost Implications: Implementing biometrics or smart card authentication often requires specialized hardware or software, escalating the overall costs.

		Usability and Affordability: While these systems are technologically advanced, their everyday practicality and accessibility for the average user remain in question. Not everyone might have access to the required devices or find them convenient.

		Proposed Image-Based Authentication System:
		This system is an innovative leap, shifting the paradigm of authentication:

		Visual Grid of Images:

		During the registration or setup phase, users are presented with a grid filled with predetermined images or icons. Depending on the implementation, this could be a 10x10 grid or four 5x5 grids.
		A diverse array of image sets are utilized, ranging from common icons to mnemonic symbols and even Telugu alphabets, catering to a broad user base.
		Image Sequence as Password:

		Users authenticate themselves by selecting a specific sequence of images from the grid. This sequence, while intuitive for the user to remember, acts as their unique "password."
		Unique Hash Generation:

		As users define their image sequence, the system, in the background, translates this sequence into a unique hash value. This value, representing the user's chosen sequence, is then stored securely in the database.
		Simplified Login Process:

		When logging in, users simply need to replicate their chosen image sequence. Given the visual nature of images, users often find this method more memorable and intuitive than traditional passwords.
		Tech Stack:

		The frontend elegantly displays the grid and captures user inputs using a combination of HTML, CSS, and JavaScript. In contrast, the backend, powered by PHP, efficiently processes the data, generates the hashes, and manages the database interactions.
		In essence, the Image-Based Authentication System seamlessly merges usability with security. By anchoring the authentication process in visual memory, it not only simplifies user access but also offers a fresh, interactive approach to digital security. As cyber threats evolve, it's innovations like these that promise a safer, user-friendly digital future.`,
	link: null,
	urlname: "IBASIcons",
	tools: ["HTML", "CSS", "JS", "Php"],
	sourceCode: null,
};

export { ProjectInfo };
