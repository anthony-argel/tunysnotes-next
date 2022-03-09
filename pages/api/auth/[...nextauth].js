import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export default NextAuth({
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
    ],
    callbacks: {
        async signIn({ user }) {
            if (user.email === process.env.ADMIN_ACC) {
                return true;
            } else {
                return "/unauthorized";
            }
        },
    },
    secret: process.env.JWT_SECRET,
});
