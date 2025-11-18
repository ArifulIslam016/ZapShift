import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData } from "react-router";

const SendParcel = () => {
  const serviceCenters = useLoaderData();
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
    console.log(data);
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
            <label className="label text-black">Sender Name</label>
            <input
              type="text"
              {...register("SenderName")}
              className="input w-full"
              placeholder="Sender Name"
            />
            <label className="label text-black">Address</label>
            <input
              type="text"
              {...register("SenderAddress")}
              className="input w-full"
              placeholder="Sender Address"
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

            {/* <label className="label text-black">District</label>
            <input
              type="text"
              {...register("SenderDistrict")}
              className="input w-full"
              placeholder="Your District"
            /> */}

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
              placeholder="Sender Name"
            />
            <label className="label text-black">Receiver Address</label>
            <input
              type="text"
              {...register("reciverAddress")}
              className="input w-full"
              placeholder="Sender Address"
            />
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
                defaultValue='Select A District'
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
