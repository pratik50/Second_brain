"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("./db");
const middleware_1 = require("./middleware");
require("dotenv/config");
const utils_1 = require("./utils");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    yield db_1.UserModel.create({
        username,
        password
    });
    res.json({
        message: "User signed up"
    });
}));
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const exitingUser = yield db_1.UserModel.findOne({
        username, password
    });
    if (exitingUser) {
        const token = jsonwebtoken_1.default.sign({
            id: exitingUser._id,
        }, process.env.JWT_PASSWORD);
        res.json({
            token
        });
    }
    else {
        res.json({
            message: "Incorect Credential"
        });
    }
}));
app.post("/api/v1/content", middleware_1.userMiddeleWare, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const link = req.body.link;
    const title = req.body.title;
    const type = req.body.type;
    yield db_1.ContentModel.create({
        link,
        title,
        type,
        //@ts-ignore
        userId: req.userId,
        tags: []
    });
    res.json({
        message: "Content added"
    });
}));
app.get("/api/v1/content", middleware_1.userMiddeleWare, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.userId;
    const data = yield db_1.ContentModel.find({
        userId: userId
    }).populate("userId", "username");
    res.json({
        data
    });
}));
app.delete("/api/v1/content", middleware_1.userMiddeleWare, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentId = req.body.contentId;
    //@ts-ignore
    const userId = req.userId;
    yield db_1.ContentModel.deleteOne({
        _id: contentId,
        //@ts-ignore
        userId
    });
    res.json({
        message: "Content Deleted"
    });
}));
app.post("/api/v1/brain/share", middleware_1.userMiddeleWare, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const share = req.body.share;
    //@ts-ignore
    const userId = req.userId;
    if (share) {
        const existingLink = yield db_1.LinkModel.findOne({
            userId: userId
        });
        if (existingLink) {
            res.json({
                hash: existingLink.hash
            });
            return;
        }
        const hash = (0, utils_1.random)(10);
        yield db_1.LinkModel.create({
            userId: userId,
            hash: hash
        });
        res.json({
            hash
        });
    }
    else {
        yield db_1.LinkModel.deleteOne({
            userId: userId
        });
        res.json({
            message: "Removed link"
        });
    }
}));
app.get("/api/v1/brain/:shareLink", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.shareLink;
    const link = yield db_1.LinkModel.findOne({
        hash
    });
    if (!link) {
        res.status(411).json({
            message: "Invalid link"
        });
        return;
    }
    const content = yield db_1.ContentModel.find({
        userId: link.userId
    });
    const user = yield db_1.UserModel.findOne({
        _id: link.userId
    });
    res.json({
        username: user === null || user === void 0 ? void 0 : user.username,
        content: content
    });
}));
app.listen(3000);
