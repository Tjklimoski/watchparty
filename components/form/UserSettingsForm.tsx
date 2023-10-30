"use client";

import useUser from "@/hooks/useUser";
import { API } from "@/lib/APIFetcher";
import React, { useEffect, useState } from "react";
import FormGroup from "./FormGroup";
import Input from "./Input";
import Select from "./Select";
import Range from "./Range";
import { stateAbrv } from "@/lib/stateAbrv";
import SlideDownReveal from "../util/SlideDownReveal";
import DeleteAccountBtn from "../util/DeleteAccountBtn";
import Skeleton from "../util/Skeleton";

interface SettingsInputs {
  name: string;
  city: string;
  state: string;
  radius: number;
  password: string;
  currentPassword: string;
}

export default function UserSettingsForm() {
  const { user, mutate } = useUser();
  const [inputs, setInputs] = useState<SettingsInputs>({
    name: "",
    city: "",
    state: "",
    radius: 50,
    password: "",
    currentPassword: "",
  });
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  // Update inputs with user data once user data is available
  useEffect(() => {
    if (!user) return;
    setLoading(false);
    // break location into array with city and state values seperated
    const location = user.location?.city?.split(",");
    setInputs({
      name: user.name ?? "",
      city: location?.length === 2 ? location[0].trim() : "",
      state: location?.length === 2 ? location[1].trim() : "",
      radius: user.radius,
      password: "",
      currentPassword: "",
    });
  }, [user]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const field = e.target.name;
    const value =
      field === "radius" ? parseInt(e.target.value) : e.target.value;
    setInputs(current => ({ ...current, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      setLoading(true);
      setError(undefined);
      setSuccess(undefined);

      // build city value from both city and state -- "city, state".
      const city =
        inputs.city && inputs.state
          ? `${inputs.city}, ${inputs.state}`
          : undefined;

      const data = {
        ...inputs,
        city,
        updatedPassword: inputs?.password,
      };

      // server API route handles validation of the data.
      await API.patch("/user/settings", data).catch(err => {
        throw new Error(err.response.data);
      });

      setSuccess("Successfully updated profile!");
      // call mutate to refetch new user data and reset inputs to new values.
      mutate();
    } catch (err: Error | any) {
      setError(
        err?.message ??
          err?.response?.data ??
          "Unable to update, please try again"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="w-full max-w-4xl mx-auto p-2 xs:p-4 md:p-6 bg-base-100 bg-opacity-60 backdrop-blur-md rounded-lg">
      <form className="[&>*:not(:last-child)]:mb-12" onSubmit={handleSubmit}>
        {!user ? (
          Array(4)
            .fill(null)
            .map((_, i) => (
              <FormGroup key={i}>
                <Skeleton className="max-w-[10ch] h-6 xs:h-7 sm:h-11" />
                <Skeleton className="h-10 sm:h-11" />
              </FormGroup>
            ))
        ) : (
          <>
            {/* NAME FIELD */}
            <FormGroup>
              <label
                htmlFor="name"
                className="text-lg xs:text-xl sm:text-2xl font-semibold"
              >
                Name
              </label>
              <Input
                label="name"
                type="text"
                name="name"
                value={inputs.name}
                disabled={loading}
                onChange={handleChange}
                required
                minLength={2}
              />
            </FormGroup>

            {/* CITY AND STATE FIELD */}
            <FormGroup>
              <label
                htmlFor="city"
                className="text-lg xs:text-xl sm:text-2xl font-semibold"
              >
                City
              </label>
              <div className="flex flex-col xs:flex-row gap-2 xs:items-center">
                <Input
                  label="city"
                  type="text"
                  name="city"
                  value={inputs.city}
                  disabled={loading}
                  onChange={handleChange}
                />
                <Select
                  className="border-none disabled:bg-neutral disabled:opacity-60 disabled:cursor-not-allowed"
                  aria-label="state"
                  name="state"
                  value={inputs.state}
                  // required if city has a value
                  required={!!inputs.city}
                  disabled={loading}
                  onChange={handleChange}
                >
                  {stateAbrv.map(state => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </Select>
              </div>
            </FormGroup>

            {/* RADIUS FIELD */}
            <FormGroup>
              <label
                htmlFor="radius"
                className="text-lg xs:text-xl sm:text-2xl font-semibold"
              >
                Radius
              </label>
              <Range
                label="radius"
                min={1}
                max={100}
                step={1}
                value={inputs.radius}
                onChange={handleChange}
                required
                disabled={loading}
                counter
                unit="mile"
              />
            </FormGroup>

            {/* Only render password section if user is NOT Oauth */}
            {user?.emailVerified && (
              <>
                {/* UPDATE PASSWORD FIELD */}
                <FormGroup>
                  <label
                    htmlFor="password"
                    className="text-lg xs:text-xl sm:text-2xl font-semibold whitespace-break-spaces"
                  >
                    Update Password
                  </label>
                  <Input
                    label="password"
                    type="text"
                    name="password"
                    minLength={6}
                    value={inputs.password}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </FormGroup>

                {/* NEW PASSWORD FIELD */}
                <SlideDownReveal
                  condition={!!inputs.password}
                  className="-mt-12"
                >
                  <FormGroup>
                    <label
                      htmlFor="current-password"
                      className="text-lg xs:text-xl sm:text-2xl font-semibold whitespace-break-spaces"
                    >
                      Current Password
                    </label>
                    <Input
                      className="invalid:outline invalid:outline-2 invalid:outline-error"
                      label="current password"
                      type="password"
                      name="currentPassword"
                      value={inputs.currentPassword}
                      onChange={handleChange}
                      // current password required only if value in password
                      required={!!inputs.password}
                      disabled={loading}
                    />
                  </FormGroup>
                </SlideDownReveal>
              </>
            )}
          </>
        )}

        {/* Error and Success messages: */}
        {error && <p className="font-semibold text-error uppercase">{error}</p>}
        {success && (
          <p className="font-semibold text-success uppercase">{success}</p>
        )}

        <button
          type="submit"
          className="btn btn-accent w-full max-w-md block mx-auto"
          disabled={loading}
        >
          {user && loading ? (
            <span className="loading loading-spinner text-accent" />
          ) : (
            "Update Account"
          )}
        </button>
      </form>

      <DeleteAccountBtn
        loading={loading}
        setLoading={setLoading}
        setError={setError}
      />
    </section>
  );
}
