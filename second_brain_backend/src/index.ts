import express from "express";
import jwt from "jsonwebtoken";
import { ContentModel, LinkModel, UserModel } from "./db";
import { userMiddeleWare } from "./middleware";
import "dotenv/config";
import { random } from "./utils";
import cors from "cors";

const app = express();
app.use(express.json())
app.use(cors());

app.post("/api/v1/signup", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    await UserModel.create({
        username,
        password
    })

    res.json({
        message: "User signed up"
    })
})

app.post("/api/v1/signin", async (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    const exitingUser = await UserModel.findOne({
        username,password
    })

    if(exitingUser){
        const token = jwt.sign(
          {
            id: exitingUser._id,
          },process.env.JWT_PASSWORD!);

        res.json({
            token
        })
    }else{
        res.json({
            message: "Incorect Credential"
        })
    }
});

app.post("/api/v1/content", userMiddeleWare, async (req, res) => {
    const link = req.body.link;
    const title = req.body.title;
    const type = req.body.type;

    await ContentModel.create({
        link,
        title,
        type,
        //@ts-ignore
        userId: req.userId,
        tags: []
    })

    res.json({
        message: "Content added"
    })
});

app.get("/api/v1/content", userMiddeleWare, async (req, res) => {
    //@ts-ignore
    const userId = req.userId;

    const data = await ContentModel.find({
        userId: userId
    }).populate("userId", "username")

    res.json({
        data
    })
});

app.delete("/api/v1/content", userMiddeleWare,  async (req, res) => {

    const contentId = req.body.contentId;
    //@ts-ignore
    const userId = req.userId;

    
    await ContentModel.deleteOne({
        _id: contentId,
        //@ts-ignore
        userId
    })

    res.json({
        message: "Content Deleted"
    })

});

app.post("/api/v1/brain/share", userMiddeleWare, async (req, res) => {
    const share = req.body.share;
    //@ts-ignore
    const userId = req.userId;
    
    if (share) {
        const existingLink = await LinkModel.findOne({
            userId: userId
        });

        if (existingLink) {
            res.json({
                hash: existingLink.hash
            })
            return;
        }
        const hash = random(10);
        await LinkModel.create({
            userId: userId,
            hash: hash
        })

        res.json({
            hash
        })
    } else {
        await LinkModel.deleteOne({
            userId: userId
        });

        res.json({
            message: "Removed link"
        })
    }
});

app.get("/api/v1/brain/:shareLink", async (req, res) => {
    const hash = req.params.shareLink;
    const link = await LinkModel.findOne({
        hash 
    });

    if(!link){
        res.status(411).json({
            message: "Invalid link"
        })
        return;
    }

    const content = await ContentModel.find({
        userId: link.userId
    })

    const user = await UserModel.findOne({
        _id: link.userId
    })

    res.json({
        username: user?.username,
        content: content
    })
});

app.listen(3000)