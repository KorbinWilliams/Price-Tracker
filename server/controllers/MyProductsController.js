import _myProductService from "../services/MyProductService";
import express from "express";
import { Authorize } from "../middleware/authorize.js";

//PUBLIC
export default class MyProductController {
  constructor() {
    this.router = express
      .Router()
      .use(Authorize.authenticated)
      .get("", this.getAll)
      // .get("/:id", this.getById)
      .post("", this.create)
      .put("/:id", this.edit)
      .use(this.defaultRoute);
  }

  defaultRoute(req, res, next) {
    next({ status: 404, message: "No Such Route" });
  }

  async getAll(req, res, next) {
    try {
      let data = await _myProductService.getAll(req.session.uid);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      req.body.authorId = req.session.uid;
      let data = await _myProductService.create(req.body);
      return res.status(201).send(data);
    } catch (error) {
      next(error);
    }
  }

  // async getById(req, res, next) {
  //   try {
  //     let data = await _myProductService.getById(req.body.id);
  //     return res.send(data);
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  async edit(req, res, next) {
    try {
      let data = await _myProductService.edit(
        req.params.id,
        req.body,
        req.session.uid
      );
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
}
