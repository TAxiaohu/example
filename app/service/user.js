'use strict';

const Service = require('egg').Service;
const { strToInt } = require('../utils/utils');

class UserService extends Service {
  constructor(ctx) {
    super(ctx);
    this.userModel = ctx.model.User;
  }

  // 根据id查询用户
  async findUserById(id) {
    return await this.userModel.findByPk(strToInt(id));
  }

  // 查询用户详情
  async fetchInfo(id) {
    const user = await this.findUserById(id);
    if (user) {
      return {
        code: 200,
        data: user,
      };
    }
    return {
      code: 400,
      message: '暂无这个用户',
    };
  }
  // 根据用户名查找当前用户
  async findUserByName({ name }) {
    return await this.userModel.findOne({ where: { name } });
  }
  // 注册
  async signup(signupMsg) {
    const hasName = await this.findUserByName(signupMsg);
    if (hasName) {
      return {
        code: 400,
        message: '用户名重复',
      };
    }
    const user = await this.userModel.create(signupMsg);
    return {
      code: 200,
      message: 'success',
      data: user,
    };
  }

  // 更新
  async update(params, body) {
    const { id } = params;
    const { name: originName, age } = body;

    const user = await this.userModel.findByPk(id);
    const hasName = await this.findUserByName({ name: originName });
    if (!user) {
      return {
        code: 400,
        message: '未找到该用户',
      };
    }
    if (hasName) {
      return {
        code: 400,
        message: '用户名重复',
      };
    }
    const newUser = await user.update({ name: originName, age });
    return {
      code: 200,
      message: 'success',
      data: newUser,
    };
  }

  async remove(id) {
    if (!id) {
      return {
        code: 500,
        message: 'error',
      };
    }
    const userId = strToInt(id);
    const user = await this.userModel.findByPk(userId);
    if (!user) {
      return {
        code: 400,
        message: '没找到该用户',
      };
    }
    await user.destroy();
    return {
      code: 200,
      message: 'success',
    };
  }
}

module.exports = UserService;
