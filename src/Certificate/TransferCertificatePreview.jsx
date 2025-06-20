import React from "react";

function TransferCertificatePreview({ formData }) {
  return (
    <div
      id="preview-content"
      className="font-[roboto] bg-white text-black m-12 mx-56 py-4 border-[7px] border-black relative"
    >
      <div className="flex flex-col sm:flex-row py-4 items-center justify-center relative z-10">
        <div className="w-52 h-52">
          <img
            src={formData.logoLeft}
            alt="School Logo"
            loading="lazy"
            title="School Logo"
            className="object-contain h-full w-full"
          />
        </div>
        <div className="text-center mb-12">
          <h2 className="text-red-700 mb-2 font-bold text-3xl">
            {formData.schoolName}
          </h2>
          <p className="font-semibold">{formData.schoolAddress}</p>
          <p className="font-semibold">
            UDISE No.: {formData.udiseNo} Affiliation No.:{" "}
            {formData.affiliationNo} School Code: {formData.schoolCode}
          </p>
          <div className="font-semibold">
            <a href="http://www.induraenglishschool.in" className="mx-4">
              Website: www.induraenglishschool.in
            </a>
            <a href="mailto:induraenglishschool@gmail.com" className="mx-4">
              Email: induraenglishschool@gmail.com
            </a>
          </div>
        </div>
        <div className="w-40 h-40 mb-6">
          <img
            src={formData.logoRight}
            alt="CBSE Logo"
            loading="lazy"
            title="CBSE Logo"
            className="object-contain h-full w-full"
          />
        </div>
      </div>

      <div className=" text-3xl font-semibold text-center">
        <h2>TRANSFER CERTIFICATE</h2>
      </div>

      <div className="mt-6 flex flex-col justify-start ml-48 relative z-10">
        <p className="p-2">
          <strong>1.</strong> Affiliation No.:{" "}
          <strong className="pl-2 underline">{formData.affiliationNo}</strong>{" "}
          <strong className="pl-2">2.</strong> SL No.:{" "}
          <span className="underline">{formData.SlNo}</span>{" "}
          <strong className="pl-2">3.</strong> Student ID:{" "}
          <span className="underline">{formData.StudentID}</span>{" "}
          <strong className="pl-2">4.</strong> UID No.:{" "}
          <span className="underline">{formData.UIDNo}</span>
        </p>
        <p className="p-2">
          <strong>5.</strong> School Code:{" "}
          <strong className="pl-2 underline">{formData.schoolCode}</strong>{" "}
          <strong className="pl-2">6.</strong> Admission No.:{" "}
          <span className="underline">{formData.AdmissionNo}</span>{" "}
          <strong className="pl-2">7.</strong> National Code:{" "}
          <span className="underline">{formData.NationalCode}</span>
        </p>
      </div>

      <div className="relative mt-8">
        <div className="text-center text-xl font-semibold relative z-10">
          <h1>***** ORIGINAL *****</h1>
        </div>
        <div className="absolute inset-0 flex justify-center items-center">
          <div
            className="w-[600px] h-[800px]"
            style={{
              backgroundImage: `url(${formData.logoLeft})`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              opacity: 0.2,
              zIndex: -1,
            }}
          ></div>
        </div>
        <div className="mt-4 flex flex-col justify-start ml-32 relative z-10">
          <p className="p-2">
            <strong>1.</strong> Name of the Student{" "}
            <span className="border-b-2 pb-4 border-black px-4">
              {" "}
              {formData.studentName}{" "}
            </span>{" "}
            <strong>2.</strong>Mother's Name{" "}
            <span className="border-b-2 pb-4 border-black px-4">
              {" "}
              {formData.mothersName}{" "}
            </span>
          </p>
          <p className="p-2">
            <strong>3.</strong> Father's / Guardian's Name{" "}
            <span className="border-b-2 pb-4 border-black px-4">
              {" "}
              {formData.fathersName}
            </span>{" "}
            <strong>4.</strong>Date of Birth{" "}
            <span className="border-b-2 pb-4 border-black px-4">
              {" "}
              {formData.dateOfBirth}{" "}
            </span>{" "}
          </p>
          <p className="p-2">
            <strong>5.</strong> Birth Place{" "}
            <span className="border-b-2 pb-4 border-black px-4">
              {" "}
              {formData.birthPlace}{" "}
            </span>{" "}
            /Taluka
            <span className="border-b-2 pb-4 border-black px-4">
              {" "}
              {formData.taluka}{" "}
            </span>{" "}
            /District{" "}
            <span className="border-b-2 pb-4 border-black px-4">
              {formData.district}
            </span>{" "}
          </p>
          <p className="p-2">
            <strong>6.</strong> Nationality{" "}
            <span className="border-b-2 pb-4 border-black px-4">
              {" "}
              {formData.nationality}{" "}
            </span>{" "}
            <strong>7.</strong> Whether the candidate belongs to Schedule Caste
            or Schedule Tribe
          </p>
          <p className="p-2">
            or OBC or General{" "}
            <span className="border-b-2 pb-4 border-black px-4">
              {formData.caste}{" "}
            </span>
          </p>

          <p className="p-2">
            <strong>8.</strong> Date of first admission in the School with Class{" "}
            <span className="border-b-2 pb-2 border-black px-4">
              {formData.admissionDate}
            </span>
          </p>
          <p className="p-2">
            <strong>9.</strong> Class in which the pupil last studied (in
            figure){" "}
            <span className="border-b-2 pb-2 border-black px-4">
              {formData.lastClass}
            </span>{" "}
            (in Words){" "}
            <span className="border-b-2 pb-2 border-black px-4">
              {formData.inWords}
            </span>
          </p>
          <p className="p-2">
            <strong>10.</strong> School/Board Annual Examination last taken with
            result{" "}
            <span className="border-b-2 pb-2 border-black px-4">
              {formData.lastExam}
            </span>
          </p>

          <p className="p-2">
            <strong>11.</strong> Whether failed, if so once/twice in the same
            class{" "}
            <span className="border-b-2 pb-2 border-black px-4">
              {formData.failed}
            </span>
          </p>
          <p className="p-2">
            <strong>12.</strong> Subject Studied
            {formData.subjects.map((subject, index) => (
              <span
                className="border-b-2 pb-2 border-black mx-1  px-4"
                key={index}
              >
                {subject}{" "}
              </span>
            ))}
          </p>
          <p className="p-2">
            <strong>13.</strong> Whether qualified for promotion to the higher
            class YES
            <span className="border-[1.5px] px-3 mx-1 py-[1.8px] border-black">
              {formData.promotion === "YES" && "✓"}
            </span>
            {/* <span className='border-[1.5px] mx-1  w-4 h-2 px-2   border-black'>{formData.promotion === 'YES' && '✓'}</span>  */}
            NO{" "}
            <span className="border-[1.5px] px-3 mx-1 py-[1.8px] border-black">
              {formData.promotion === "NO" && "✓"}
            </span>
            {/* NO <span className='border-[1.5px]  w-4 h-2 px-2 mx-1  border-black'>{formData.promotion === 'NO' && '✓'}</span> */}
          </p>
          <p className="p-2">
            <strong>14.</strong> Total No. of working days in the academic
            session{" "}
            <span className="border-b-2 pb-2 border-black px-4">
              {formData.workingDays}
            </span>
          </p>
          <p className="p-2">
            <strong>15.</strong> Total No. of presence in the academic session{" "}
            <span className="border-b-2 pb-2 border-black px-4">
              {formData.presence}
            </span>
          </p>
          <p className="p-2">
            <strong>16.</strong> Month up to which the pupil has paid school
            dues{" "}
            <span className="border-b-2 pb-2 border-black px-4">
              {formData.duesPaid}
            </span>
          </p>
          <p className="p-2">
            <strong>17.</strong> Whether school is under Govt./ Minority /
            Independent Category YES
            <span className="border-[1.5px] px-3 mx-1 py-[1.8px] border-black">
              {formData.govtCategory === "YES" && "✓"}
            </span>
            NO{" "}
            <span className="border-[1.5px] px-3 mx-1 py-[1.8px] border-black">
              {formData.govtCategory === "NO" && "✓"}
            </span>
          </p>
          <p className="p-2">
            <strong>18.</strong> Games played or extra curricular activities in
            which the pupil usually took part (mention achievement level
            therein) YES
            <span className="border-[1.5px] px-3 mx-1 py-[1.8px] border-black">
              {formData.extracurricular === "YES" && "✓"}
            </span>
            NO{" "}
            <span className="border-[1.5px] px-3 mx-1 py-[1.8px] border-black">
              {formData.extracurricular === "NO" && "✓"}
            </span>
          </p>
          <p className="p-2">
            <strong>19.</strong> Progress:{" "}
            <span className="border-b-2 pb-2 border-black px-4">
              {formData.progress}
            </span>{" "}
            <strong>20.</strong> Conduct:{" "}
            <span className="border-b-2 pb-2 border-black px-4">
              {formData.conduct}
            </span>
          </p>
          <p className="p-2">
            <strong>21.</strong> Reason of Leaving:{" "}
            <span className="border-b-2 pb-2 border-black px-4">
              {formData.reasonForLeaving}
            </span>
          </p>
          <p className="p-2">
            <strong>22.</strong> Date of application for certificate{" "}
            <span className="border-b-2 pb-2 border-black px-4">
              {formData.applicationDate}
            </span>{" "}
          </p>
          <p className=" p-2">
            <strong>23.</strong> Date on which pupils name was struck off the
            rolls of the school{" "}
            <span className="underline px-1">{formData.struckOffDate}</span>
          </p>
          <p className="p-2">
            <strong>24.</strong> Date of issue of certificate{" "}
            <span className="border-b-2 pb-2 border-black px-4">
              {formData.issueDate}
            </span>
          </p>
          <p className="p-2">
            <strong>25.</strong> Any other remarks{" "}
            <span className="border-b-2 pb-2 border-black px-4">
              {formData.remarks}
            </span>
          </p>
        </div>

        <hr className="mx-28 border-b-4 my-2 border-black w-[1200px" />
        <div className="ml-32  pb-2">
          <p>
            I hereby declare that the above information including Name of the
            Candidate, Father's Name, Mother’s Name and Date of <br /> Birth
            furnished above is correct as per school records.
          </p>
        </div>
        <h4 className="px-12  mt-6 font-semibold">DATE:</h4>

        <div className="flex  font-semibold justify-between items-center pt-2 px-12">
          <p>PLACE : IES, Barmath</p>
          <p>CLERK’S SIGN </p>
          <p>PRINCIPAL’S SIGN </p>
        </div>
      </div>
    </div>
  );
}

export default TransferCertificatePreview;
