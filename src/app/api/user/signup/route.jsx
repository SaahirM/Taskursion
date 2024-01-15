import client from "@/src/app/db";
import bcrypt from 'bcrypt'

const SALT_ROUNDS = 10;

export async function POST(req) {
    const data = await req.json();
    console.log(data);
    if (!data.name || !data.email || !data.pass) {
        return new Response(
            "Missing one of the following required fields: name, email, pass."
        , { status: 400 });
    }

    const hash = await bcrypt.hash(data.pass, SALT_ROUNDS);

    const res = client.connect()
        .then(async () => {
            const users = client.db().collection("Users");

            if (users.findOne({ user_email: data.email }) != {}) {
                return new Response(
                    "That email is already being used"
                , { status: 400 });
            }
            
            const result = await users.insertOne({
                user_name: data.name,
                user_email: data.email,
                user_pass_hash: hash
            })
            return Response.json({ _id: result.insertedId });
            // TODO change this, set cookie and redirect
        })
        .finally(client.close);

    return res;
}