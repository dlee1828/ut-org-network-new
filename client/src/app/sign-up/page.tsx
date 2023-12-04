'use client'
import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Input, Select, SelectItem } from "@nextui-org/react";
import { useContext, useState } from "react";
import { collegeMajors, slugify } from "../_data-models/college-majors";
import { useRouter } from "next/navigation";
import { MyContext } from "../MyContext";

export default function SignUp() {
  type EnrollmentStatus = "undergraduate" | "graduate"
  const [enrollmentStatus, setEnrollmentStatus] = useState<EnrollmentStatus | null>(null);
  type Year = "freshman" | "sophomore" | "junior" | "senior"
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [year, setYear] = useState<Year | null>(null);
  const [major, setMajor] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [signUpButtonLoading, setSignUpButtonLoading] = useState<boolean>(false);
  const router = useRouter()

  const context = useContext(MyContext)

  const handleSignUpClicked = () => {
    console.log("MAJOR:", major)

    context!.setData({
      firstName,
      lastName,
      major: major ?? '',
      year: year ?? '',
      list_of_orgs: [],
      email: email
    })

    setSignUpButtonLoading(true);
    router.push('/home');
  }

  const handleMajorSelected = (e: any) => {
    setMajor(e.target.value)
  }

  return <div className="flex flex-col items-center pt-12">
    <Card className="w-96">
      <CardHeader className="text-center">
        Sign Up
      </CardHeader>
      <Divider />
      <CardBody className="flex gap-4">
        <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} width="100%" placeholder="First Name" />
        <Input value={lastName} onChange={(e) => setLastName(e.target.value)} width="100%" placeholder="Last Name" />
        <Input value={email} onChange={(e) => setEmail(e.target.value)} width="100%" type="email" placeholder="Email" />
        <Input width="100%" type="password" placeholder="Password" />
        <Select onChange={(e) => setEnrollmentStatus(e.target.value as EnrollmentStatus)} label="Enrollment Status">
          <SelectItem key="undergraduate" value="undergraduate">
            Undergraduate Student
          </SelectItem>
          <SelectItem key="graduate" value="graduate">
            Graduate Student
          </SelectItem>
        </Select>
        {
          enrollmentStatus == 'undergraduate' ? <Select onChange={(e) => setYear(e.target.value as Year)} label="Year">
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
        <Select onChange={(e) => handleMajorSelected(e)} label="Major">
          {
            collegeMajors.map((major) =>
              <SelectItem key={major} value={major}>{major}</SelectItem>
            )
          }
        </Select>
        <Button onClick={handleSignUpClicked} isLoading={signUpButtonLoading}>
          Sign Up
        </Button>
      </CardBody>
    </Card>
  </div>
}