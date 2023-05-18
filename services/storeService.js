import * as dotenv from "dotenv";
dotenv.config();

import axios from "axios";
import md5 from "md5";
import Product from "../models/Product.js";

export default class StoreService {
	static _appId = process.env.BUSINESS_RU_APP_ID;
	static _secret = process.env.BUSINESS_RU_SECRET;
	static _address = process.env.BUSINESS_RU_ADDRESS;

    static async appPsw(params = {}) {
		try {
		  const _token = await this.getToken();
		  const { _appId, _secret } = this;
		  const newParams = { app_id: _appId, ...params };
		  const orderedParams = Object.keys(newParams).sort().reduce(
			(obj, key) => {
				obj[key] = newParams[key];
				return obj;
			}, {});
		  const paramsString = new URLSearchParams(orderedParams).toString();
		  const appPsw = md5(`${_token + _secret + paramsString}`);
		  console.log(appPsw);
		  return appPsw;
		} catch (e) {
		  console.log(e.message);
		}
	}

	static async getToken() {
		try {
			const params = {
				app_id: this._appId,
				app_psw: md5(`${this._secret}app_id=${this._appId}`),
			};
			const response = await axios.get(
				`${this._address}/api/rest/repair.json`,
				{ params }
			);
			this._token = response.data.token;
			return response.data.token;
		} catch (e) {
		    console.log(e.message);
		}
	}

	static async request(method, model, params = {}, body = {}) {
		try {
			const appId = this._appId;
			const address = this._address;
			const appPsw = await this.appPsw(params);
			const url = `${address}/api/rest/${model}.json`;
			const nativeParams = {
				app_id: appId,
				app_psw: appPsw,
			};
			let res;
			if (method === "get") {
				res = await axios.get(url, { params: { ...nativeParams, ...params }, body });
			} else if (method === "post") {
				res = await axios.post(url, body, { params: { ...nativeParams, ...params } });
			} else if (method === "put") {
				res = await axios.put(url, body, { params: { ...nativeParams, ...params } });
			}
			return res.data;
		} catch (e) {
		  console.log(e.message);
		}
	}

	static async getProducts() {
		try {
			const res = await this.request("get", "goods", {
				with_attributes: 1,
				with_prices: 1,
			});
			return res.result;
		} catch (e) {
			console.log(e.message);
		}
	}

	static async getPartnerByPhone(phone){
		try {
			const res = await this.request('get', 'partners', { phone })
			return res.result
		} catch (e) {
			console.log(e.message);
		}
	}
	static async getPartnerByEmail(email){
		try {
			const res = await this.request('get', 'partners', { email })
			return res.result
		} catch (e) {
			console.log(e.message);
		}
	}
	static async createPartner(name, phone = '', email = '') {
        try {
            const partner = await this.request('post', 'partners', { name })
            const id = Number(partner.result.id)
            const types = await this.request('get', 'contactinfotypes')

            for (let type of types.result) {
                const typeId = Number(type.id)
                let value

                if (type.name === 'Email') {
                    value = email
                } else if (type.name === 'Телефон') {
                    value = phone
                }

                if (value) {
                    await this.request('post', 'partnercontactinfo', {
                        contact_info: value,
                        contact_info_type_id: typeId,
                        partner_id: id,
                    })
                }
            }

            return partner
        } catch (e) {
            console.log(e.message);
        }
    }

	static async createOrder(cartId, type, partnerId, address = '', comment = '', products, withoutDocuments = false) {
        try {
            const employees = await this.request('get', 'employees')
            let employeeId

            for (let employee of employees.result) {
                if (employee.email === 'ilyasov.zhan@gmail.com') {
                    employeeId = Number(employee.id)
                }
            }

            if (!employeeId) {
                employeeId = Number(employees.result[0].id)
            }
            const organizations = await this.request('get', 'organizations')
            let organizationId = Number(organizations.result[0].id)

            if (type == 'maguapay') {
                comment = [comment, ''].join("\n")
            }
            const order = await this.request('post', 'customerorders', {
                author_employee_id: employeeId,
                comment: withoutDocuments ? "Без документов\n" + comment : comment,
                delivery_address: address,
                organization_id: organizationId,
                partner_id: partnerId,
                responsible_employee_id: employeeId,
            })
            const id = Number(order.result.id)
            for (let item of products) {
                await this.request('post', 'customerordergoods', {
                    amount: item.quantity,
                    customer_order_id: id,
                    good_id: item.good_id,
                    price: item.price,
                })
            }
            return { success: true }
        } catch (e) {
            console.log(e.message)
        }
    }
}