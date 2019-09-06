'use strict';

const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class UserController extends Controller {

  constructor(ctx) {
    super(ctx);
    this.UserServices = ctx.service.user;
  }

  async index() {
    const ctx = this.ctx;
    const query = { limit: toInt(ctx.query.limit), offset: toInt(ctx.query.offset) };
    ctx.body = await ctx.model.User.findAll(query);
  }

  async show() {
    const { ctx } = this;
    const { params } = ctx;
    const result = await this.UserServices.fetchInfo(params.id);
    if (result.code === 400) {
      ctx.status = 400;
    } else {
      ctx.status = 200;
    }
    ctx.body = result;
  }

  async create() {
    const ctx = this.ctx;
    const createRule = {
      name: { type: 'string' },
      age: { type: 'number' },
    };
    ctx.validate(createRule);

    const result = await this.UserServices.signup(ctx.request.body);
    if (result.code === 400) {
      ctx.status = 400;
    } else {
      ctx.status = 200;
    }
    ctx.body = result;
  }

  async update() {
    const ctx = this.ctx;
    const result = await this.UserServices.update(ctx.params, ctx.request.body);
    if (result.code === 400) {
      ctx.status = 400;
    } else {
      ctx.status = 200;
    }
    ctx.body = result;
  }

  async destroy() {
    const ctx = this.ctx;
    const { params } = ctx;
    const result = await this.UserServices.remove(params.id);
    if (result.code === 400) {
      ctx.status = 400;
    } else {
      ctx.status = 200;
    }
    ctx.body = result;
  }
}

module.exports = UserController;
