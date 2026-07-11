-- Progress is now stored in each visitor's browser. Remove the unused
-- authentication and server-side progress tables to minimize retained data.
DROP TABLE "Account";
DROP TABLE "Session";
DROP TABLE "VerificationToken";
DROP TABLE "LessonProgress";
DROP TABLE "User";
