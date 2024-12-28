import { useRef } from "react";
import Swal from "sweetalert2";
import classes from "./askQuestion.module.css";
import axiosBase from "../../../utility/axios.js";
import { useNavigate } from "react-router-dom";


function AskQuestion() {
	const navigate = useNavigate();
	const titleDom = useRef();
	const descriptionDom = useRef();

	// Retrieve the token from localStorage
	const token = localStorage.getItem("token");

	async function handleSubmit(e) {
		e.preventDefault();
		const title = titleDom.current.value;
		const description = descriptionDom.current.value;

		try {
			// Make a POST request to your server to create a new question
			const response = await axiosBase.post(
				"/question",
				{
					title,
					description,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`, // Use the token from localStorage
					},
				}
			);

			if (response.status === 201) {
				console.log("Question created successfully");
				await Swal.fire({
					title: "Success!",
					text: "Question created successfully!",
					icon: "success",
					confirmButtonText: "OK",
				});
				navigate("/home");
			} else {
				console.error("Failed to create question");
				await Swal.fire({
					title: "Error",
					text: "Failed to create question",
					icon: "error",
					confirmButtonText: "OK",
				});
			}
		} catch (error) {
			console.error(error);
			await Swal.fire({
				title: "Error",
				text: "Failed to create question. Please try again later.",
				icon: "error",
				confirmButtonText: "OK",
			});
		}
	}

	return (
	
			<div className={classes.allContainer}>
				<div className={classes.question__container}>
					<div className={classes.question__wrapper}>
						<div className={classes.questionContainer}>
							<h2 className={classes.questionTitle}>
								Steps To Write A Good Question.
							</h2>
							<div className={classes.questionList}>
								<ul className={classes.questionListUl}>
									<li className={classes.questionItem}>
										<span className={classes.icon}>→</span> Summarize your
										problems in a one-line title.
									</li>
									<li className={classes.questionItem}>
										<span className={classes.icon}>→</span> Describe your
										problem in more detail.
									</li>
									<li className={classes.questionItem}>
										<span className={classes.icon}>→</span> Describe what you
										tried and what you expected to happen.
									</li>
									<li className={classes.questionItem}>
										<span className={classes.icon}>→</span> Review your question
										and post it here.
									</li>
								</ul>
							</div>
						</div>
					</div>
					<h4 className={classes.highlight}>Post Your Question</h4>
					<div className={classes.question__header__titleTwo}>
						<form onSubmit={handleSubmit} className={classes.question__form}>
							<input
								className={classes.question__title2}
								ref={titleDom}
								type="text"
								placeholder="Question title"
								required
							/>
							<textarea
								rows={4}
								className={classes.question__description}
								ref={descriptionDom}
								placeholder="Question Detail ..."
								required
							/>
							<div className={classes.buttonContainer}>
								<button className={classes.question__button} type="submit">
									Post Question
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		
	);
}

export default AskQuestion;
