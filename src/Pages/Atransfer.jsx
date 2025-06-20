import React from "react";
import logoLeft from "../img/1000077337-removebg-preview.png";
import logoRight from "../img/cbse-logo-46D5A6B556-seeklogo.com.png";

function Atransfer() {
  return (
    <div className="font-[roboto] m-12 mx-56 py-4 border-[7px] border-black relative">
      <div className="flex flex-col sm:flex-row py-4 items-center justify-center relative z-10">
        <div className="w-52 h-52">
          <img
            src={logoLeft}
            alt="School Logo"
            loading="lazy"
            title="School Logo"
            className="object-contain h-full w-full"
          />
        </div>
        <div className="text-center mb-12">
          <h2 className="text-red-700 mb-2 font-bold text-3xl">
            INDURA ENGLISH SCHOOL (CBSE)
          </h2>
          <p className="font-semibold">
            Enjangaon (East), Tq, Basmath Dist Hingoli
          </p>
          <p className="font-semibold">
            UDISE No.: 27160301903 Affiliation No.: 1131230 School Code: 31217
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
            src={logoRight}
            alt="CBSE Logo"
            loading="lazy"
            title="CBSE Logo"
            className="object-contain h-full w-full"
          />
        </div>
      </div>

      <div className="mt-4 text-3xl font-semibold text-center">
        <h2>TRANSFER CERTIFICATE</h2>
      </div>

      <div className="mt-6 flex flex-col justify-start ml-48 relative z-10">
        <p className="p-2">
          <strong>1.</strong> Affiliation No.:{" "}
          <strong className="pl-2">1131230</strong>{" "}
          <strong className="pl-2">2.</strong> SL No.: <span>________</span>{" "}
          <strong className="pl-2">3.</strong> Student ID:{" "}
          <span>__________</span> <strong className="pl-2">4.</strong> UID No.:{" "}
          <span>_______</span>
        </p>
        <p className="p-2">
          <strong>5.</strong> School Code:{" "}
          <strong className="pl-2">31217</strong>{" "}
          <strong className="pl-2">6.</strong> Admission No.:{" "}
          <span>______________</span> <strong className="pl-2">7.</strong>{" "}
          National Code: <span>__________________</span>
        </p>
      </div>

      <div className="relative mt-12">
        <div className="text-center text-xl font-semibold relative z-10">
          <h1>***** ORIGINAL *****</h1>
        </div>
        <div className="absolute inset-0 flex justify-center items-center">
          <div
            className="w-[600px] h-[800px]"
            style={{
              backgroundImage: `url(${logoLeft})`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              opacity: 0.2,
              zIndex: -1,
            }}
          ></div>
        </div>
        <div className="mt-6 flex flex-col justify-start ml-32 relative z-10">
          <p className="p-2">
            <strong>1.</strong> Name of the Student{" "}
            <span> ____________________________ </span> <strong>2.</strong>
            Mother's Name <span> ____________________________ </span>
          </p>
          <p className="p-2">
            <strong>3.</strong> Father's / Guardian's Name{" "}
            <span> ____________________________</span> <strong>4.</strong>Date
            of Birth <span> ____________________________ </span>{" "}
          </p>
          <p className="p-2">
            <strong>5.</strong> Birth Place <span> _____________ </span> /Taluka
            <span> _____________ </span> /District <span>__________</span>{" "}
          </p>
          <p className="p-2">
            <strong>6.</strong> . Nationality <span> _____________ </span>{" "}
            <strong>7.</strong> Whether the candidate belongs to Schedule Caste
            or Schedule Tribe
          </p>
          <p className="p-2">
            or OBC or General <span>____________ </span>
          </p>

          <p className="p-2">
            <strong>8.</strong> Date of first admission in the School with Class{" "}
            <span>
              _____________________________________________________________
            </span>
          </p>
          <p className="p-2">
            <strong>9.</strong> Class in which the pupil last studied (in
            figure) <span>_______</span> (in Words){" "}
            <span>________________________________________________</span>
          </p>
          <p className="p-2">
            <strong>10.</strong> School/Board Annual Examination last taken with
            result{" "}
            <span>
              _____________________________________________________________
            </span>
          </p>

          <p className="p-2">
            <strong>11.</strong> Whether failed, if so once/twice in the same
            class <span>_____________________</span>
          </p>
          <p className="p-2">
            <strong>12.</strong> Subject Studied 1. ______________ 2.
            _________________ 3. _______________ 4. ______________
            5.__________________ <br />
            6. __________________
          </p>
          <p className="p-2">
            <strong>13.</strong> Whether qualified for promotion to the higher
            class YES{" "}
            <span className=" border-[1.5px]  px-3   mx-1 py-[1.8px] border-black"></span>{" "}
            NO{" "}
            <span className=" mx-1 border-[1.5px]  px-3  py-[1.8px] border-black"></span>
          </p>
          <p className="p-2">
            <strong>14.</strong> Total No. of working days in the academic
            session <span>_________________________</span>
          </p>
          <p className="p-2">
            <strong>15.</strong> Total No. of presence in the academic session{" "}
            <span>___________________________</span>
          </p>
          <p className="p-2">
            <strong>16.</strong> Month up to which the pupil has paid school
            dues <span>_________________________</span>
          </p>
          <p className="p-2">
            <strong>17.</strong> Whether school is under Govt./ Minority /
            Independent Category YES{" "}
            <span className=" border-[1.5px]  px-3   mx-1 py-[1.8px] border-black"></span>{" "}
            NO{" "}
            <span className=" mx-1 border-[1.5px]  px-3  py-[1.8px] border-black"></span>
          </p>
          <p className="p-2">
            <strong>18.</strong> Games played on extra curricular activities in
            which the pupil usually took part (mention achievement level
            therein){" "}
          </p>
          <p className="p-1 px-12">
            YES <span className=" px-4">NO</span>
          </p>
          <p className="p-2">
            <strong>19.</strong> Progress:{" "}
            <span>____________________________</span> <strong>20.</strong>{" "}
            Conduct: <span>___________________________</span>
          </p>
          {/* <p className='p-2'><strong>20.</strong> Conduct: <span>___________________________</span></p> */}
          <p className="p-2">
            <strong>21.</strong> Reason of Leaving:{" "}
            <span>
              ______________________________________________________________________
            </span>
          </p>
          <p className="p-2">
            <strong>22.</strong> Date of application for certificate{" "}
            <span>_________________</span> <strong>23.</strong> Date on which
            pupils name was struck off the rolls of the{" "}
          </p>
          <p className=" p-2">school</p>
          <p className="p-2">
            <span>_____________________</span>
            <strong>24.</strong> Date of issue of certificate{" "}
            <span>____________________</span>
          </p>
          <p className="p-2">
            <strong>25.</strong> Any other remarks{" "}
            <span>____________________</span>
          </p>
        </div>
        <hr className=" mx-28 border-b-4 my-2 border-black w-[1200px" />
        <div className="   ml-32">
          <p>
            I hereby declare that the above information including Name of the
            Candidate, Father's Name, Mother’s Name and Date of Birth furnished
            above is correct as per school records.
          </p>
        </div>
        <h4 className="px-12 mt-6   font-semibold">DATE:</h4>

        <div className="flex font-semibold justify-between items-center pt-2 px-12">
          <p>PLACE : IES, Barmath</p>
          <p>CLERK’S SIGN </p>
          <p>PRINCIPAL’S SIGN </p>
        </div>
      </div>
    </div>
  );
}

export default Atransfer;
