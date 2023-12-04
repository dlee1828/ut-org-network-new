'use client'

import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { collegeMajors, slugify } from "../_data-models/college-majors";
import { Autocomplete, TextField } from "@mui/material";
import { allOrganizations } from "../_data-models/all-organizations";
import { MyContext } from "../MyContext";

const CurrentOrganizationsComponent = () => {
  const context = useContext(MyContext)
  const [selectedOrganizations, setSelectedOrganizations] = useState<string[]>(context?.data?.list_of_orgs ?? []);

  const handleChange = (event: any, newValue: string[]) => {
    setSelectedOrganizations(newValue);
    context?.setData({ ...context.data!, list_of_orgs: newValue })
  };

  return <div className="w-96">
    <Autocomplete
      multiple
      id="tags-standard"
      options={allOrganizations}
      value={selectedOrganizations}
      onChange={handleChange}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          label="Current Organizations I'm In"
          placeholder=""
        />
      )}
    />
  </div>
}

export default function EditProfile() {
  const context = useContext(MyContext)

  const router = useRouter();
  type EnrollmentStatus = "undergraduate" | "graduate"
  const [enrollmentStatus, setEnrollmentStatus] = useState<EnrollmentStatus | "">("undergraduate");
  type Year = "freshman" | "sophomore" | "junior" | "senior"
  const [firstName, setFirstName] = useState<string>(context?.data?.firstName ?? '');
  const [lastName, setLastName] = useState<string>(context?.data?.lastName ?? '');
  const [email, setEmail] = useState<string>(context?.data?.email ?? '');
  const [year, setYear] = useState<string>(context?.data?.year ?? '');
  const [major, setMajor] = useState<string | "">(context?.data?.major ?? '');

  const [backButtonLoading, setBackButtonLoading] = useState<boolean>(false);

  const handleBackButtonClicked = () => {
    console.log("MAJOR:", major)
    context!.setData({
      firstName,
      lastName,
      major: major ?? '',
      year: year ?? '',
      list_of_orgs: context!.data?.list_of_orgs!,
      email: email
    })

    setBackButtonLoading(true);
    router.push('/home');
  }

  return <div className="flex flex-col items-center pt-28 gap-4 w-96 mx-auto">
    <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} width="100%" label="First Name" />
    <Input value={lastName} onChange={(e) => setLastName(e.target.value)} width="100%" label="Last Name" />
    <Input value={email} onChange={(e) => setEmail(e.target.value)} width="100%" type="email" label="Email" />
    <Select value={enrollmentStatus} defaultSelectedKeys={[enrollmentStatus]} onChange={(e) => setEnrollmentStatus(e.target.value as EnrollmentStatus)} label="Enrollment Status">
      <SelectItem key="undergraduate" value="undergraduate">
        Undergraduate Student
      </SelectItem>
      <SelectItem key="graduate" value="graduate">
        Graduate Student
      </SelectItem>
    </Select>
    {
      enrollmentStatus == 'undergraduate' ?
        <Select defaultSelectedKeys={[year]} value={year} onChange={(e) => setYear(e.target.value as Year)} label="Year">
          <SelectItem key="Freshman" value="Freshman">
            Freshman
          </SelectItem>
          <SelectItem key="Sophomore" value="Sophomore">
            Sophomore
          </SelectItem>

          <SelectItem key="Junior" value="Junior">
            Junior
          </SelectItem>

          <SelectItem key="Senior" value="Senior">
            Senior
          </SelectItem>
        </Select> : null
    }
    <Select defaultSelectedKeys={[major]} value={major} onChange={(e) => setMajor(e.target.value)} label="Major">
      {
        collegeMajors.map((major) =>
          <SelectItem key={major} value={major}>{major}</SelectItem>
        )
      }
    </Select>
    <CurrentOrganizationsComponent></CurrentOrganizationsComponent>

    <Button isLoading={backButtonLoading} onClick={handleBackButtonClicked} color="primary" radius="full">Back</Button>
  </div>
}