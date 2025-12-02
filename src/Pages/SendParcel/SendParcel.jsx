import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useSecureInstance from "../../hooks/SecureInstance";
import useAuthhooks from "../../hooks/Authhooks";

const SendParcel = () => {
  const navigate = useNavigate();
  const serviceCenters = useLoaderData();
  const Insatance = useSecureInstance();
  const { user } = useAuthhooks();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const serviceCentersRegions = serviceCenters.map(
    (serviceCenter) => serviceCenter.region
  );
  const Regions = [...new Set(serviceCentersRegions)];
  const senderRegion = useWatch({ control, name: "senderRegion" });
  const reciverRegion = useWatch({ control, name: "reciverRegion" });
  const handleDistictByReigion = (region) => {
    const districtsByRegion = serviceCenters.filter(
      (serviceCenter) => serviceCenter.region === region
    );
    const disticts = districtsByRegion.map((d) => d.district);
    return disticts;
  };

  const handleSendParcel = (data) => {
    let cost = 0;
    const isDocumnet = data.documnetType === "Document";
    const isSameDistrict = data.reciverDistrict === data.senderDistrict;
    const weight = parseFloat(data.parcelWeight);
    if (isSameDistrict) {
      if (isDocumnet) {
        const DocumnetCost = 60;
        cost = DocumnetCost;
      } else {
        const nonDocConst = weight <= 3 ? 110 : 110 + (weight - 3) * 40;
        cost = nonDocConst;
      }
    } else {
      if (isDocumnet) {
        const docCost = 80;
        cost = docCost;
      } else {
        const nonDocumnetCost =
          weight <= 3 ? 150 : 150 + (weight - 3) * 40 + 40;
        cost = nonDocumnetCost;
      }
    }
    data.bearingCost = cost;
    Swal.fire({
      title: "Agree With Price?",
      text: `Total:${cost}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "I agree",
    }).then((result) => {
      if (result.isConfirmed) {
        Insatance.post("/parcels", data)
          .then((res) => {
            if (res.data.insertedId) {
              navigate("/dashboard/my-percels");
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your parcel saved please pay now",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          })
          .catch();
      }
    });
    // console.log(cost);
  };
  return (
    <div className="bg-white rounded-2xl py-20 px-26 mt-8 mx-5">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-extrabold text-neutral">Send a Parcel</h1>
      </div>
      <form
        onSubmit={handleSubmit(handleSendParcel)}
        className="mt-8 space-y-5 text-black"
      >
        <div>
          <label className="mr-10">
            <input
              type="radio"
              name="radio-1"
              {...register("documnetType")}
              className="radio"
              value={"Document"}
              defaultChecked
            />{" "}
            Document
          </label>
          <label>
            <input
              type="radio"
              name="radio-1"
              {...register("documnetType")}
              className="radio"
              value={"NonDocument"}
            />{" "}
            Non Doument
          </label>
        </div>
        {/* parcell Name weight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* parcel Name */}
          <fieldset className="fieldset">
            <label className="label text-black">Parcel Name</label>
            <input
              type="text"
              {...register("parcelName")}
              className="input w-full"
              placeholder="Parcel Name"
            />
          </fieldset>
          <fieldset className="fieldset">
            <label className="label text-black">Parcel Weight</label>
            <input
              type="number"
              {...register("parcelWeight")}
              className="input w-full"
              placeholder="Parcel Weight"
            />
          </fieldset>
        </div>
        {/* sender reciver stucture grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <fieldset className="fieldset">
            <h1 className="text-2xl font-semibold">Sender Details</h1>
            {/* Sender Name Secion */}
            <label className="label text-black">Sender Name</label>
            <input
              defaultValue={user?.displayName}
              type="text"
              {...register("SenderName")}
              className="input w-full"
              placeholder="Sender Name"
            />
            {/* Sender Email Addess */}
            <label className="label text-black">Eamil Address</label>
            <input
              defaultValue={user.email}
              type="email"
              {...register("SenderEamil")}
              className="input w-full"
              placeholder="Your Email Address"
            />

            <label className="label text-black">Phone No:</label>
            <input
              type="tel"
              {...register("SenderPhone", {
                required: "Phone number is required",
                pattern: {
                  value: /^01[3-9][0-9]{8}$/,
                  message: "Enter a valid Bangladesh phone number",
                },
              })}
              className="input w-full"
              placeholder="01XXXXXXXXX"
            />
            {errors.SenderPhone && (
              <p className="text-red-500 text-sm mb-2">
                {errors.SenderPhone.message}
              </p>
            )}
            {/* Sender Region */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Your Region</legend>
              <select
                {...register("senderRegion", { required: true })}
                defaultValue="Select a Region"
                className="select"
              >
                <option disabled={true}>Select a Region</option>
                {Regions.map((Region, index) => {
                  return (
                    <option key={index} value={Region}>
                      {Region}
                    </option>
                  );
                })}
              </select>
              {errors.senderRegion?.type === "required" && (
                <p className="text-red-500">Please Seclect a Region</p>
              )}
            </fieldset>
            {/* Sender Districts */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Your District</legend>
              <select
                {...register("senderDistrict", { required: true })}
                defaultValue="Select a District"
                className="select"
              >
                <option disabled={true}>Select a District </option>
                {handleDistictByReigion(senderRegion).map((Region, index) => {
                  return (
                    <option key={index} value={Region}>
                      {Region}
                    </option>
                  );
                })}
              </select>
              {errors.senderDistrict?.type === "required" && (
                <p className="text-red-500">Please Seclect a District</p>
              )}
            </fieldset>
            {/* Sender Addess */}
            <label className="label text-black">Address</label>
            <input
              type="text"
              {...register("SenderAddress")}
              className="input w-full"
              placeholder="Sender Address"
            />

        
            {/* Sender Pickup instructions */}
            <label className="label text-black">Picup Instructions</label>
            <textarea
              type="text"
              {...register("instructionsToPickUP")}
              className="textarea w-full"
              placeholder="Pickup Instructions"
            />
          </fieldset>
          {/* Reciver Sections */}
          <fieldset className="fieldset">
            <h1 className="text-2xl font-semibold">Reciver Details</h1>
            <label className="label text-black">Receiver Name</label>
            <input
              type="text"
              {...register("reciverName")}
              className="input w-full"
              placeholder="Reciver Name"
            />
            {/* Reciver Email address Secions */}
            <label className="label text-black">Receiver Email Address</label>
            <input
              type="eamil"
              {...register("reciverEamil")}
              className="input w-full"
              placeholder="Email Address"
            />
            {/* Reciver Addesss Secions */}

            <label className="label text-black">Receiver Contact No</label>
            <input
              type="tel"
              {...register("reciverPhone", {
                required: "Phone number is required",
                pattern: {
                  value: /^01[3-9][0-9]{8}$/,
                  message: "Enter a valid Bangladesh phone number",
                },
              })}
              className="input w-full"
              placeholder="01XXXXXXXXX"
            />
            {errors.reciverPhone && (
              <p className="text-red-500 text-sm mb-2">
                {errors.reciverPhone.message}
              </p>
            )}
            {/* Reciver Region */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Reciver Region</legend>
              <select
                {...register("reciverRegion", { required: true })}
                defaultValue="Select Reciver Region"
                className="select"
              >
                <option disabled={true}>Select Reciver Region</option>
                {Regions.map((Region, index) => {
                  return (
                    <option key={index + 8} value={Region}>
                      {Region}
                    </option>
                  );
                })}
              </select>
            </fieldset>
            {errors.reciverRegion?.type === "required" && (
              <p className="text-red-500">Please Seclect a Region</p>
            )}
            {/* reciver Districts */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Select a Distict</legend>
              <select
                {...register("reciverDistrict", { required: true })}
                defaultValue="Select A District"
                className="select"
              >
                <option disabled={true}>Select A District </option>
                {handleDistictByReigion(reciverRegion).map(
                  (district, index) => {
                    return (
                      <option key={index} value={district}>
                        {district}
                      </option>
                    );
                  }
                )}
              </select>
              {errors.reciverDistrict?.type === "required" && (
                <p className="text-red-500">Please Seclect a District</p>
              )}
            </fieldset>
            <label className="label text-black">Receiver Address</label>
            <input
              type="text"
              {...register("reciverAddress")}
              className="input w-full"
              placeholder="Reciver Address"
            />
            <label className="label text-black">Delivery Instruction</label>
            <textarea
              type="text"
              {...register("instructionsToDelivery")}
              className="textarea w-full"
              placeholder="Delivery Instructions"
            />
          </fieldset>
        </div>
        <input
          type="submit"
          className="btn btn-primary text-black"
          value="Submit"
        />
      </form>
    </div>
  );
};

export default SendParcel;
/***{documnetType: 'Document', parcelName: '', parcelWeight: '', SenderName: '', SenderAddress: 'Garudha,Fulkocha', …}
SenderAddress
: 
"Garudha,Fulkocha"
SenderName
: 
""
SenderPhone
: 
"01610854092"
documnetType
: 
"Document"
instructionsToDelivery
: 
""
instructionsToPickUP
: 
""
parcelName
: 
""
parcelWeight
: 
""
reciverAddress
: 
"Garudha,Fulkocha"
reciverDistrict
: 
"Select A District"
reciverName
: 
"Ariful Islam"
reciverPhone
: 
"01610854092"
reciverRegion
: 
"Select Reciver Region"
senderDistrict
: 
"Select a District"
senderRegion
: 
"Select a Region"
[[Prototype]]
: 
Object */

//  if(weight<3){
//         cost=nonDocCost
// }         const nonDocCost=110;
