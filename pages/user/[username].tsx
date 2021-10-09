import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar";
import { ConsultantProfileEntity } from "../../entities/ConsultantProfileEntity";
import { HighschoolerProfileEntity } from "../../entities/HighschoolerProfileEntity";
import { UserEntity } from "../../entities/UserEntity";
import { findConsultantProfileById } from "../../firestore/consultantProfiles/findConsultantProfileById";
import { findHighschoolerProfileById } from "../../firestore/highschoolerProfiles/findHighschoolerProfileById";
import { findUserByUsername } from "../../firestore/users/findUserByUsername";

const UserPage = () => {
  const router = useRouter();

  const { username } = router.query;
  const [user, setUser] = useState<UserEntity>(null);

  const [highschoolerProfile, setHighschoolerProfile] =
    useState<HighschoolerProfileEntity>();
  const [consultantProfile, setConsultantProfile] =
    useState<ConsultantProfileEntity>();

  useEffect(() => {
    (async () => {
      if (username) {
        const userFound = await findUserByUsername(username as string);
        setUser(userFound);
      }

      // if (user?.accountType === "consultant") {
      //   setConsultantProfile(
      //     await findConsultantProfileById(user?.consultantProfileId),
      //   );
      // }

      // if (user?.accountType === "highschooler") {
      //   setHighschoolerProfile(
      //     await findHighschoolerProfileById(user?.highschoolerProfileId),
      //   );
      // }
    })();
  }, []);

  console.log("sdjbgjhsfd", user);

  return (
    <div>
      <Navbar />
      <div className="relative w-screen container mx-auto flex justify-center gap-2 mt-5">
        <div className="w-[40rem] rounded-md bg-bgVariant1 p-5">d</div>
        <ProfileCard
          user={user}
          // highschoolerProfile={highschoolerProfile}
          // consultantProfile={consultantProfile}
        />
      </div>
    </div>
  );
};

const ProfileCard = ({ user }: { user: UserEntity }) => {
  console.log("profile", user);

  return (
    <div className="w-[19.5rem] rounded-md bg-bgVariant1 p-5 flex flex-col items-center gap-4 text-center">
      {/* Avatar */}
      <img
        src={user?.avatarUrl}
        className="h-[7rem] w-[7rem] rounded-full"
        alt=""
      />

      <div>
        <span className="px-3 py-1 rounded-full font-semibold text-xs bg-accent1">
          {user?.accountType === "highschooler"
            ? "High Schooler"
            : "Consultant"}
        </span>
        <div className="flex flex-col items-center mt-2">
          <h2 className="text-[1.4rem] font-semibold">{user?.displayName}</h2>
          <span className="text-sm text-muted1">@{user?.username}</span>
        </div>
      </div>

      {/* <div className="flex items-center gap-2">
        {user?.accountType === "consultant" && (
          <div className="flex flex-col">
            <h5 className="font-semibold text-sm">Unicoins</h5>
            <span className="text-muted1 text-xs">
              {consultantProfile?.unicoins}
            </span>
          </div>
        )}
      </div> */}
    </div>
  );
};

export default UserPage;
