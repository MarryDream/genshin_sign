import request from "../../genshin/utils/requests";
import {getDS2} from "./ds";

const __API = {
	FETCH_HAS_BIND_ACCOUNT: "https://api-takumi.mihoyo.com/binding/api/getUserGameRolesByCookie",//米有社 绑定角色信息
	FECH_HAS_SIGN: "https://api-takumi.mihoyo.com/event/bbs_sign_reward/info",//是否签到
	FECH_SIGN: "https://api-takumi.mihoyo.com/event/bbs_sign_reward/sign",//签到
};


const HEADERS2 = {
	"User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 12_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) miHoYoBBS/2.34.1",
	"Referer": "https://webstatic.mihoyo.com/bbs/event/signin-ys/index.html?bbs_auth_required=true&act_id=e202009291139501&utm_source=bbs&utm_medium=mys&utm_campaign=icon",
	"Accept": "application/json, text/plain, */*",
	"Accept-Encoding": "gzip, deflate",
	"Accept-Language": "zh-CN,en-US;q=0.8",
	"Origin": "https://webstatic.mihoyo.com",
	"X-Requested-With": "com.mihoyo.hyperion",
	"x-rpc-app_version": "2.34.1",
	"x-rpc-client_type": 5,
	"x-rpc-device_id": guid(),
	"DS": ""
};

function guid() {
	function S4() {
		return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
	}
	return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

export async function sign( uid: number, region: string, cookie: string ): Promise<any> {
	const body = {
		act_id: 'e202009291139501',
		uid: uid,
		region: region
	};

	return new Promise( ( resolve, reject ) => {
		request( {
			method: "POST",
			url: __API.FECH_SIGN,
			json: true,
			body,
			headers: {
				...HEADERS2,
				"Cookie": cookie,
				"content-type": "application/json",
				"DS": getDS2()
			}
		} )
			.then( ( result ) => {
				resolve( result );
			} )
			.catch( ( reason ) => {
				reject( reason );
			} );
	} );
}

export async function getHasSign( uid: number, region: string, cookie: string ): Promise<any> {
	const query = { act_id: "e202009291139501", region: region, uid: uid };
	return new Promise( ( resolve, reject ) => {
		request( {
			method: "GET",
			url: __API.FECH_HAS_SIGN,
			qs: query,
			headers: {
				...HEADERS2,
				"Cookie": cookie
			}
		} )
			.then( ( result ) => {
				resolve( JSON.parse( result ) );
			} )
			.catch( ( reason ) => {
				reject( reason );
			} );
	} );
}


export async function getUserGameRolesByCookie( cookie: string ): Promise<any> {
	const query = { game_biz: "hk4e_cn" };
	return new Promise( ( resolve, reject ) => {
		request( {
			method: "GET",
			url: __API.FETCH_HAS_BIND_ACCOUNT,
			qs: query,
			headers: {
				...HEADERS2,
				"Cookie": cookie
			}
		} )
			.then( ( result ) => {
				resolve( JSON.parse( result ) );
			} )
			.catch( ( reason ) => {
				reject( reason );
			} );
	} );
}
