"use client";

import Input from "@/components/form/Input";
import Select from "@/components/form/Select";
import UserPageHeading from "@/components/user/UserPageHeading";
import Container from "@/components/util/Container";
import useUser from "@/hooks/useUser";
import { stateAbrv } from "@/lib/stateAbrv";
import React, { useEffect, useState } from "react";

interface SettingsInputs {
  name?: string;
  city?: string;
  state?: string;
  radius?: number;
  password?: string;
  currentPassword?: string;
}

export default function SettingsPage() {
  const { user } = useUser();
  const [inputs, setInputs] = useState<SettingsInputs>({});
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  // Update inputs with user data once user data is available
  useEffect(() => {
    if (!user) return;
    // break location into array with city and state values seperated
    const location = user.location?.city?.split(",");
    setInputs({
      name: user.name ?? undefined,
      city: location?.length === 2 ? location[0].trim() : undefined,
      state: location?.length === 2 ? location[1].trim() : undefined,
      radius: user.radius,
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
      };

      // server API route handles validation of the data.
      console.log("Data to submit to API: ", data);

      setSuccess("Successfully updated profile!");
    } catch (err: Error | any) {
      console.error(err);
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
    <main className="min-h-screen">
      <Container>
        <UserPageHeading title="Settings" />

        <section className="w-full max-w-4xl mx-auto p-2 xs:p-4 md:p-6 bg-base-100 bg-opacity-60 backdrop-blur-md rounded-lg">
          <form
            className="[&>*:not(:last-child)]:mb-12"
            onSubmit={handleSubmit}
          >
            <div className="items-center gap-2 grid grid-cols-none sm:grid-cols-[12ch,1fr] grid-rows-[min-content,1fr] sm:grid-rows-none">
              <label htmlFor="name" className="text-2xl font-semibold">
                Name
              </label>
              <Input
                label="name"
                type="text"
                name="name"
                value={inputs.name}
                disabled={loading}
                onChange={handleChange}
              />
            </div>

            <div className="items-center gap-2 grid grid-cols-none sm:grid-cols-[12ch,1fr] grid-rows-[min-content,1fr] sm:grid-rows-none">
              <label htmlFor="city" className="text-2xl font-semibold">
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
            </div>

            <div className="items-center gap-2 grid grid-cols-none sm:grid-cols-[12ch,1fr] grid-rows-[min-content,1fr] sm:grid-rows-none">
              <label htmlFor="radius" className="text-2xl font-semibold">
                Radius
              </label>
              <div className="flex flex-row gap-2 items-center group">
                {/* Focus input none on range input, focus outline moved to range thumb and span counting the numbers. */}
                <Input
                  className="bg-transparent cursor-grab appearance-none transition duration-100 focus:outline-none
                  
                  [&::-moz-range-track]:bg-neutral [&::-moz-range-track]:h-[3px] [&::-moz-range-track]:rounded-full [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:w-[clamp(18px,3vw,25px)] [&::-moz-range-thumb]:h-[clamp(18px,3vw,25px)] [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb:active]:cursor-grabbing [&::-moz-range-thumb:active]:bg-primary-focus [&::-moz-range-thumb:active]:scale-110 [&::-moz-range-thumb:hover]:scale-110 [&::-moz-range-thumb:active]:shadow-md [&::-moz-range-thumb:active]:shadow-primary/50 [&::-moz-range-thumb:hover]:shadow-md [&::-moz-range-thumb:hover]:shadow-primary/50 [&:focus-visible::-moz-range-thumb]:outline [&:focus-visible::-moz-range-thumb]:outline-2 [&:focus-visible::-moz-range-thumb]:outline-offset-2 [&:focus-visible::-moz-range-thumb]:outline-primary [&:focus-visible::-moz-range-thumb]:scale-110
                
                  [&::-webkit-slider-runnable-track]:bg-neutral [&::-webkit-slider-runnable-track]:h-[3px] [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[clamp(18px,3vw,25px)] [&::-webkit-slider-thumb]:aspect-square [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb:active]:cursor-grabbing [&::-webkit-slider-thumb:active]:bg-primary-focus [&::-webkit-slider-thumb:hover]:scale-110 [&::-webkit-slider-thumb:active]:scale-110 [&::-webkit-slider-thumb:active]:shadow-md [&::-webkit-slider-thumb:active]:shadow-primary/50 [&::-webkit-slider-thumb:hover]:shadow-md [&::-webkit-slider-thumb:hover]:shadow-primary/50 [&::-webkit-slider-thumb]:mt-[calc((3px/2)-(clamp(18px,3vw,25px)/2))] [&:focus-visible::-webkit-slider-thumb]:outline [&:focus-visible::-webkit-slider-thumb]:outline-2 [&:focus-visible::-webkit-slider-thumb]:outline-offset-2 [&:focus-visible::-webkit-slider-thumb]:outline-primary [&:focus-visible::-webkit-slider-thumb]:scale-110"
                  label="radius"
                  type="range"
                  name="radius"
                  min={1}
                  max={100}
                  step={1}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />

                <span className="text-right text-xl min-w-[3ch] rounded-md group-focus-within:outline group-focus-within:outline-2 group-focus-within:outline-primary group-focus-within:outline-offset-2 select-none leading-4">
                  {inputs.radius}
                  <br />
                  <span className="text-sm font-thin">miles</span>
                </span>
              </div>
            </div>

            {/* Only render password section if user is NOT Oauth */}
            {user?.emailVerified && (
              <>
                <div className="items-center gap-2 grid grid-cols-none sm:grid-cols-[12ch,1fr] grid-rows-[min-content,1fr] sm:grid-rows-none">
                  <label
                    htmlFor="password"
                    className="text-2xl font-semibold whitespace-break-spaces"
                  >
                    New Password
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
                </div>

                <div className="items-center gap-2 grid grid-cols-none sm:grid-cols-[12ch,1fr] grid-rows-[min-content,1fr] sm:grid-rows-none">
                  <label
                    htmlFor="current-password"
                    className="text-2xl font-semibold whitespace-break-spaces"
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
                </div>
              </>
            )}

            {/* Error and Success messages: */}
            {error && (
              <p className="font-semibold text-error uppercase">{error}</p>
            )}
            {success && (
              <p className="font-semibold text-success uppercase">{success}</p>
            )}

            <button
              type="submit"
              className="btn btn-accent w-full max-w-md block mx-auto"
              disabled={loading}
            >
              Update Account
            </button>
          </form>

          <button
            type="button"
            className="btn btn-neutral w-full max-w-md block mx-auto mt-4"
            disabled={loading}
          >
            Delete Account
          </button>
        </section>
      </Container>
    </main>
  );
}
