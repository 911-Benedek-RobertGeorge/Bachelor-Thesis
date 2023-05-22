import React, { useState } from "react";
//import { Datepicker, Input, initTE } from "tw-elements";

import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
//InitTE({ Datepicker, Input });
export const ProjectForm = () => {
	const [date, setDate] = useState(new Date());
	const handleDateChange = (date) => {
		// Handle date change here
		setDate(date);
		console.log(date);
	};
	return (
		<div>
			<div class="relative min-h-screen  grid  ">
				<div class="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 ">
					<div class=" w-full space-y-12">
						<div class="lg:text-left text-center">
							<div class="flex items-center justify-center ">
								<div class="w-[70%] bg-gradient-to-b from-color-bg to-black grid grid-cols-1 md:grid-cols-2 gap-4 shadow-lg shadow-color-logo rounded-lg px-8 py-10">
									<div className=" flex flex-col space-y-4 ">
										<label class="font-bold text-lg text-white  ">Project description CID</label>
										<input
											type="text"
											formControlName="projectCID"
											placeholder="Project description CID"
											class="border rounded-lg py-3 px-3  bg-black border-color-logo placeholder-white-500 text-white"
										></input>
										<label class="font-bold text-lg text-white  ">NFT image CID</label>
										<input
											type="text"
											formControlName="nftCID"
											placeholder="NFT image CID"
											className="border rounded-lg py-3 px-3  bg-black border-color-logo placeholder-white-500 text-white"
										></input>

										<label for="description" class="font-bold text-lg text-white ">
											Short Description
										</label>
										<textarea
											id="description"
											maxlength="250"
											rows="5"
											className="border rounded-lg py-3 px-3 bg-black border-color-logo placeholder-white-500 text-white"
											placeholder="Write a short description of the project..."
										></textarea>
									</div>
									<div class="flex flex-col md:ml-8 space-y-4  ">
										<label class="font-bold text-lg text-white ">Reward</label>
										<input
											type="number"
											placeholder="Amount in WorkShare Token"
											class="border rounded-lg py-3 px-3 mt-4 bg-black  border-color-logo placeholder-white-500 text-white"
										></input>
										<label class="font-bold text-lg text-white ">Penalty</label>
										<input
											type="number"
											placeholder="Penalty in WorkShare Token"
											class="border rounded-lg py-3 px-3 mt-4 bg-black  border-color-logo placeholder-white-500 text-white"
										></input>
										<label className="font-bold text-lg text-white ">Deadline</label>
										<DatePicker
											selected={new Date()} // Set initial selected date here
											onChange={handleDateChange} // Handle date change callback
										/>
										<div class="relative mb-3" data-te-datepicker-init data-te-input-wrapper-init>
											<input
												type="text"
												class="peer block min-h-[auto] w-full rounded border-0 bg-white px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
												placeholder="Select a date"
											/>
											<label
												for="floatingInput"
												class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
											>
												Select a date
											</label>
										</div>
										<div class="flex-grow"></div>
										<button
											className="w-1/2 mx-auto mt-auto flex justify-center  border border-indigo-600 bg-black text-white rounded-lg py-3 font-semibold"
											routerLink="/projects"
										>
											Create Project
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
