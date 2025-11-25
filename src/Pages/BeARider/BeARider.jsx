import React from "react";
import { useForm, useWatch } from "react-hook-form";
import useAuthhooks from "../../hooks/Authhooks";
import { useLoaderData } from "react-router";
import riderImg from "../../assets/agent-pending.png";
import useSecureInstance from "../../hooks/SecureInstance";
import Swal from "sweetalert2";

const BeARider = () => {
  const serviceCenters = useLoaderData();
  const { user } = useAuthhooks();
  const Instance = useSecureInstance();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset
  } = useForm();
  const serviceCentersRegions = serviceCenters.map(
    (serviceCenter) => serviceCenter.region
  );
  const Regions = [...new Set(serviceCentersRegions)];
  const selectedRegion = useWatch({ control, name: "region" });
  const districtByRegion = (region) => {
    const selectedServiceCenter = serviceCenters.filter(
      (serviceCenter) => serviceCenter.region === region
    );
    const districts = selectedServiceCenter.map(
      (serviceCenter) => serviceCenter.district
    );
    return districts;
  };
  const handleBeARider = (data) => {
    const name = data.name;
    const email = data.email;
    const nid = data.nid;
    const bike = data.bike;
    const age = data.age;
    const region = data.region;
    const district = data.district;

    const riderInfo = {
      name,
      email,
      nid,
      bike,
      age,
      region,
      district,
    };
    Instance.post("/riders", riderInfo).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          title: "Applied",
          text: "We wil rechout you!",
          icon: "success",
        });
        reset()
      }
    });
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className=" p-10 mx-auto w-full  shrink-0 ">
        <h1 className="text-3xl font-extrabold text-neutral">
          Apply to Be a Rider and earn
        </h1>
        <form onSubmit={handleSubmit(handleBeARider)}>
          <fieldset className="fieldset w-full">
            {/* Name Section */}
            <label className="label font-bold">Name</label>
            <input
              {...register("name", { required: true })}
              type="text"
              className="input w-full"
              defaultValue={user?.displayName}
              placeholder="Name"
            />
            {errors?.name?.type === "required" && (
              <p className="text-red-500">Name required</p>
            )}
            <input
              {...register("email", { required: true })}
              type="text"
              className="input w-full"
              defaultValue={user?.email}
              placeholder="email"
            />
            {errors?.email?.type === "required" && (
              <p className="text-red-500">email required</p>
            )}
            {/* Photo section
          <label className="label">Photo</label>
          <input
            {...register("photo", { required: true })}
            type="file"
            className="file-input"
            placeholder="Photo"
          />
          {errors?.email?.type === "required" && (
            <p className="text-red-500">Photo required</p>
          )} */}
            {/* Email Section */}
            <label className="label">Age</label>
            <input
              {...register("age", { required: true })}
              type="number"
              className="input w-full"
              placeholder="Your Age"
            />
            {errors?.age?.type === "required" && (
              <p className="text-red-500">Age required</p>
            )}
            <label className="label">Nid No</label>
            <input
              {...register("nid", {
                // required: true,
              })}
              type="number"
              className="input w-full"
              placeholder="NId No"
            />
            <label className="label">Bike</label>
            <input
              {...register("bike", {})}
              type="text"
              className="input w-full"
              placeholder="bike"
            />
            <label className="label">Phone</label>
            <input
              {...register("phone", {})}
              type="tel"
              className="input w-full"
              placeholder="bike"
            />

            <fieldset className="fieldset">
              <legend className="fieldset-legend w-full">Regions</legend>
              <select
                defaultValue="Select a region"
                {...register("region")}
                className="select w-full"
              >
                <option disabled={true}>Select a region</option>
                {Regions.map((region, index) => (
                  <option key={index} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend w-full">District</legend>
              <select
                defaultValue="Select a district"
                className="select w-full"
                {...register("district")}
              >
                <option disabled={true}>Select a district</option>
                {districtByRegion(selectedRegion).map((district, index) => (
                  <option key={index} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </fieldset>
            <button className="btn  outline-0 focus:outline-0 focus:ring-0 border-0 bg-primary mt-4">
              Apply
            </button>
          </fieldset>
        </form>
      </div>
      <div className="flex justify-center items-center">
        <img src={riderImg} alt="" />
      </div>
    </div>
  );
};

export default BeARider;
