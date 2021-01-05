import { PAYDOWN_METHODS } from "../data";

export class PlanModel {
  constructor({ method = PAYDOWN_METHODS.minPayments, initSnowball = 0 }) {
    this.method = method;
    this.initSnowball = initSnowball;
  }
}
