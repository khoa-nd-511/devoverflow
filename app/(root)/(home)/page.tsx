import React from "react";

import HomeFilters from "@/components/home/HomeFilters";
import Filter from "@/components/shared/Filter";
import NoResults from "@/components/shared/NoResults";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { HomePageFilters } from "@/constants/filters";
import QuestionCard from "@/components/cards/QuestionCard";
import AskQuestionButton from "@/components/shared/AskQuestionButton";
import { getQuestions } from "@/lib/actions/question.action";

const Home = async () => {
  const { questions } = await getQuestions({});

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between sm:flex-row">
        <h1 className="h1-bold text-dark100_light900 max-sm:mt-6">
          All Questions
        </h1>

        <AskQuestionButton />
      </div>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch placeholder="Search questions" />

        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[65px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>

      <HomeFilters />

      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((question) => {
            return (
              <QuestionCard
                key={question._id}
                _id={question._id}
                answers={question.answers}
                author={question.author}
                createdAt={question.createdAt}
                tags={question.tags}
                title={question.title}
                upvotes={question.upvotes}
                views={question.views}
              />
            );
          })
        ) : (
          <NoResults
            title="There’s no question to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the
        discussion. our query could be the next big thing others learn from. Get
        involved! 💡"
            cta={<AskQuestionButton otherClasses="mt-5" />}
          />
        )}
      </div>
    </>
  );
};

export default Home;
