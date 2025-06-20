import React from "react";

function BonfitePreview({ formData }) {
  return (
    <div
      id="preview-content"
      className="font-[roboto] m-12 p-8 text-black bg-white mx-56 py-4 border-black border-[8px] relative"
    >
      <div className="flex flex-col sm:flex-row py-4 items-center justify-center relative z-10">
        <div className="w-52 h-56 mr-4 ">
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
          <div className="text-center font-semibold ">
            <a href="http://www.induraenglishschool.in" className="mx-1.5">
              Website: www.induraenglishschool.in
            </a>
            <a href="mailto:induraenglishschool@gmail.com" className="mx-1.5">
              Email: induraenglishschool@gmail.com
            </a>
          </div>
        </div>
        <div className="w-40 h-40 mb-12 ml-12">
          <img
            src={formData.logoRight}
            alt="CBSE Logo"
            loading="lazy"
            title="CBSE Logo"
            className="object-contain h-full w-full"
          />
        </div>
      </div>

      <div>
        <h2 className="text-center font-semibold text-4xl">
          BONAFIDE CERTIFICATE
        </h2>
      </div>
      <div className="flex justify-between items-center m-4 font-semibold">
        <p>Certificate No.: {formData.certificateNo}</p>
        <p className="mr-12">Regd. No: {formData.regdNo}</p>
      </div>
      <div className="relative mt-12">
        <div className="absolute inset-0 flex justify-center items-center">
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: `url(${formData.logoLeft})`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              opacity: 0.3,
              zIndex: 1,
            }}
          ></div>
        </div>
        <div className="relative z-10 mt-6 text-center text-xl p-6">
          <div className="p-6  bg-opacity-70">
            <p className="m-4 text-center text-lg leading-relaxed tracking-wider">
              <strong>This is to clarify that</strong>
              <span className="border-b-2 border-black px-2 pb-2">
                {formData.studentName}
              </span>
              <strong className="px-2">, is a BONAFIDE</strong>
            </p>
            <p className="m-4 text-center text-lg leading-relaxed tracking-wider">
              student of our school, studying in
              <span className="border-b-2 border-black px-4 pb-2">
                {formData.studying}
              </span>{" "}
              Year:
              <span className="border-b-2 pb-2 border-black px-4">
                {formData.date}
              </span>
              .
            </p>
            <p className="m-4 text-center text-lg leading-relaxed tracking-wider">
              His/her birthdate as recorded in our General Register is
              <span className="border-b-2 pb-2 border-black px-4">
                {formData.birthDate}
              </span>
              (in words:{" "}
              <span className="border-b-2 pb-2 border-black px-4">
                {formData.birthDateInWords}
              </span>
              ).
            </p>
            <p className="m-4 text-center text-lg leading-relaxed tracking-wider">
              His/her birthplace is{" "}
              <span className="border-b-2 pb-2 border-black px-4">
                {formData.birthPlace}
              </span>{" "}
              and belongs to{" "}
              <span className="border-b-2 pb-2 border-black px-4">
                {formData.caste}
              </span>{" "}
              caste.
            </p>
            <p>
              To the best of my knowledge, he bears a good moral character and
              has shown good progress.
            </p>
          </div>
        </div>
      </div>
      <p className="mt-4 m-2">
        Reason:{" "}
        <span className="border-b-2 pb-2 border-black px-4">
          {formData.reason}
        </span>
      </p>
      <div className="mt-12">
        <h4 className="px-12 mt-6 text-lg font-semibold">PLACE: </h4>
      </div>
      <div className="flex pb-4 text-lg font-semibold justify-between items-center pt-2 px-12">
        <p> DATE: </p>
        <p>CLERK’S SIGN </p>
        <p>PRINCIPAL’S SIGN </p>
      </div>
    </div>
  );
}

export default BonfitePreview;
