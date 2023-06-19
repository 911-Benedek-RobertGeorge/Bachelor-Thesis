import React from "react";

export const ApplicantsList = ({ applicantsList }) => {
	return (
		<div className="relative  max-w-lg">
			<div className="m-4 relative space-y-2">
				{applicantsList.map((applicant) => (
					<div className="p-2 bg-black  border border-color-logo rounded-lg flex items-center justify-between space-x-8">
						<div className="flex-1 flex justify-between items-center">
							<div className="  bg-black  text-sky-500  rounded">{applicant}</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
