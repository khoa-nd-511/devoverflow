import UserCard from "@/components/cards/UserCard";
import UsersFilter from "@/components/community/UsersFilter";
import Filter from "@/components/shared/Filter";
import NoResults from "@/components/shared/NoResults";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { UserFilters } from "@/constants/filters";
import { getAllUsers } from "@/lib/actions/user.action";
import React from "react";

const Community = async () => {
  const { users } = await getAllUsers({});

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between sm:flex-row">
        <h1 className="h1-bold text-dark100_light900 max-sm:mt-6">All Users</h1>
      </div>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route="/community"
          placeholder="Enter user name to search..."
          otherClasses="flex-1"
        />

        <Filter
          filters={UserFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>

      <UsersFilter />

      <div className="mt-10 flex w-full flex-wrap gap-6">
        {users.length > 0 ? (
          users.map(({ _id, name, username, picture }) => {
            return (
              <UserCard
                key={_id}
                id={_id}
                name={name}
                username={username}
                imgURL={picture}
              />
            );
          })
        ) : (
          <NoResults title="No Users" description="" />
        )}
      </div>
    </>
  );
};

export default Community;
