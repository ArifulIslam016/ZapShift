import React from "react";
import { useForm } from "react-hook-form";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
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
          {/* sender reciver flex */}
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
            <label className="label text-black">District</label>
            <input
              type="text"
              {...register("SenderDistrict")}
              className="input w-full"
              placeholder="Your District"
            />
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
            <label className="label text-black">Receiver District</label>
            <input
              type="text"
              {...register("reciverDistrict")}
              className="input w-full"
              placeholder="Your District"
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
