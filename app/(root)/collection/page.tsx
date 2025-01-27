import React from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { QuestionFilters } from "@/constants/filters";
import Filter from "@/components/shared/Filter";
import NoResults from "@/components/shared/NoResults";
import LocalSearch from "@/components/shared/search/LocalSearch";
import QuestionCard from "@/components/cards/QuestionCard";
import CTAButton from "@/components/shared/CTAButton";
import { getSavedQuestions } from "@/lib/actions/question.action";
import { searchParamsSchema } from "@/lib/validations";

const CollectionPage = async ({ searchParams }: { searchParams: unknown }) => {
    const parsedSearchParams = searchParamsSchema.parse(searchParams);
    const { userId: clerkId } = auth();

    if (!clerkId) redirect("/sign-in");

    const questions = await getSavedQuestions({
        clerkId,
        searchQuery: parsedSearchParams.q,
        filter: parsedSearchParams.filter,
    });

    return (
        <>
            <div className="flex w-full flex-col-reverse justify-between sm:flex-row">
                <h1 className="h1-bold text-dark100_light900 max-sm:mt-6">
                    Saved Questions
                </h1>

                <CTAButton label="Ask a question" href="/ask-question" />
            </div>

            <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
                <LocalSearch placeholder="Enter question's title..." />

                <Filter
                    filters={QuestionFilters}
                    otherClasses="min-h-[56px] sm:min-w-[170px]"
                />
            </div>

            <div className="mt-10 flex w-full flex-col gap-6">
                {questions.length > 0 ? (
                    questions.map((question) => {
                        return (
                            <QuestionCard
                                key={String(question._id)}
                                id={String(question._id)}
                                answers={question.answers}
                                author={question.author}
                                createdAt={question.createdAt}
                                tags={question.tags}
                                title={question.title}
                                upvotes={question.upvotes.length}
                                views={question.views}
                                clerkId={clerkId}
                            />
                        );
                    })
                ) : (
                    <NoResults
                        title="There’s no question to show"
                        description="Be the first to break the silence! 🚀 Ask a Question and kickstart the
        discussion. our query could be the next big thing others learn from. Get
        involved! 💡"
                        cta={
                            <CTAButton
                                label="Ask a question"
                                href="/ask-question"
                                otherClasses="mt-5"
                            />
                        }
                    />
                )}
            </div>
        </>
    );
};

export default CollectionPage;
