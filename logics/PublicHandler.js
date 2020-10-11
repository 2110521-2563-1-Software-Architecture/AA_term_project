const SheetModel = require('../model/Sheet');
const SheetGroupModel = require('../model/SheetGroup');
const OwnsheetModel = require('../model/Ownsheet');
const PromoModel = require('../model/Promo');
const mongoose = require('mongoose');
const base32 = require('hi-base32');
const UserSellModel = require('../model/UserSell');
const OrderModel = require('../model/Order');
const StoreModel = require('../model/Store');
const ScoreModel = require('../model/Score');
const StrangerModel = require('../model/Stranger');
var Util = require('../utils/util');
const request = require('request-promise');


function byteToHexString(uint8arr) {
	if (!uint8arr) {
		return '';
	}
  
	var hexStr = '';
	for (var i = 0; i < uint8arr.length; i++) {
		var hex = (uint8arr[i] & 0xff).toString(16);
		hex = (hex.length === 1) ? '0' + hex : hex;
		hexStr += hex;
	}
	return hexStr;
}

module.exports = {
	searchSheet: async(param) => {
		try{
			if(param.pageLimit>100)
				return {success:false,msg:['ผมรู้นะว่าคุณคิดจะทำอะไร','I see what you did there :p']};
			var filter = param.filter;
			var store = filter.store;
			var storeO = await StoreModel.findOne({code:store},{searchIn:1});
			filter.store = {$in:storeO.searchIn};
			filter.visible=true;
			filter.status=4;
			var query = {$and:[filter]};
			var text=param.search.trim().split(/\s+/);
			var reg='';
			for(var i=0;i<text.length;i++)
				if(text[i]!=='')
					reg+='(?=.*'+text[i]+')';
			if(reg!=='')
				query['$and'].push({searchQuery:{$regex:reg}});
			var sort = param.sort.trim();
			if(sort.length===0)
				sort='-created';
			var data  = await SheetModel.find(query,'-status -visible -searchQuery').sort(sort).skip(param.page*param.pageLimit).limit(param.pageLimit);
			return {success:true,data,timeStamp:param.timeStamp};
		}
		catch(err)
		{
			return {success:false,msg:['เกิดข้อผิดพลาด กรุณาลองใหม่','Something went wrong, please try again']};
		}
	},
	recGroup: async(param) => {
		try{
			var query = {$and:[{store:param.store},{$or:[]}]};
			var text=param.search.toLowerCase().trim().split(/\s+/);
			for(var i=0;i<text.length;i++)
				if(text[i]!=='')
					query.$and[1].$or.push({keywords:text[i]});
			var data=[];
			if(query.$and[1].$or.length!=0)
				data = await SheetGroupModel.find(query,{_id:1,sheets:1,name:1});
			return {success:true,data,timeStamp:param.timeStamp};
		}
		catch(err)
		{
			return {success:false,msg:['เกิดข้อผิดพลาด กรุณาลองใหม่','Something went wrong, please try again']};
		}
	},
	getSheetInfo: async(user,sheetID) => {
		try{
			var oid = mongoose.Types.ObjectId(sheetID);
			var sheet = await SheetModel.findOne({_id:oid,status:4,visible:true},'-status -visible -searchQuery');
			if(!sheet)
				return {success:false,msg:['ไม่พบชีท','Sheet not found']};
			var store=await StoreModel.findOne({code:sheet.store},'code color name short -_id');
			var otherSheet = await SheetModel.find({_id:{$ne:oid},author:sheet.author,status:4,visible:true},'-status -visible -searchQuery -author -authorCode -classInfo -created -detail').sort({bought:-1}).limit(5);
			//var otherSubSheet = await SheetModel.find({_id:{$ne:oid},name:{$regex:'^'+sheet.name.split(' ')[0].toLowerCase(),$options: 'i'},status:4,visible:true},'-status -visible -searchQuery -author -authorCode -classInfo -created -detail').sort({bought:-1}).limit(5);
			var otherSubSheet = [];
			var reviews = await ScoreModel.find({sheet:oid},{facebookID:0,sheet:0}).sort({created:-1});
			if(!user)
				return {success:true,data:{sheet:Object.assign({},sheet._doc,{owned:false,storeInfo:store._doc,otherSheet,otherSubSheet,reviews})}};
			var own = await OwnsheetModel.findOne({sheet:oid,facebookID:user.facebookID});
			if(own||sheet.author===user.facebookID)
				return {success:true,data:{user:{_id:user._id,name:user.name,infoEnter:user.infoEnter,seller:false},sheet:Object.assign({},sheet._doc,{owned:true,storeInfo:store._doc,otherSheet,otherSubSheet,reviews})}};
			return {success:true,data:{user:{_id:user._id,name:user.name,infoEnter:user.infoEnter,seller:false},sheet:Object.assign({},sheet._doc,{owned:false,storeInfo:store._doc,otherSheet,otherSubSheet,reviews})}};
		}
		catch(err)
		{
			return {success:false,msg:['เกิดข้อผิดพลาด กรุณาลองใหม่','Something went wrong, please try again']};
		}
	},
	getGroupInfo: async(user,groupID) => {
		try{
			var oid = mongoose.Types.ObjectId(groupID);
			var group = await SheetGroupModel.findOne({_id:oid},'-keywords -store');
			if(!group)
				return {success:false,msg:['ไม่พบกลุ่มชีท','Sheet group not found']};
			var sheets = await SheetModel.find({_id:{$in:group.sheets},visible:true},'reviewer score bought price');
			if(!user)
				return {success:true,data:{group,sheets}};
			return {success:true,data:{user:{_id:user._id,name:user.name,infoEnter:user.infoEnter,seller:false},group,sheets}};
		}
		catch(err)
		{
			return {success:false,msg:['เกิดข้อผิดพลาด กรุณาลองใหม่','Something went wrong, please try again']};
		}
	},
	verifyPromo: async(promoCode) => {
		try{
			var dat = Date.now();
			var promo = await PromoModel.findOne({code:promoCode,start:{$lte:dat},end:{$gte:dat}},'-created -start -end -_id');
			if(!promo)
				return {success:false,msg:['ไม่พบรหัสส่วนลด','Promo code not found']};
			return {success:true,data:promo};
		}
		catch(err)
		{
			return {success:false,msg:['เกิดข้อผิดพลาด กรุณาลองใหม่','Something went wrong, please try again']};
		}
	},
	getFaculty: async(code) => {
		try{
			var store = await StoreModel.findOne({code});
			if(!store)
				return {success:false,msg:['ไม่พบสถาบันการศึกษานี้','Institute not found']};
			return {success:true,data:store.faculty};
		}
		catch(err)
		{
			return {success:false,msg:['เกิดข้อผิดพลาด กรุณาลองใหม่','Something went wrong, please try again']};
		}
	},
	getHome: async(user) => {
		try{
			//some data
			var storeCount=await  StoreModel.find({hidden:false}).countDocuments();
			var sheetCount=await  SheetModel.estimatedDocumentCount();
			var sellCount=await   UserSellModel.estimatedDocumentCount();
			var orderCount=await  OrderModel.estimatedDocumentCount();
			var storeList=await StoreModel.find({hidden:false},{code:1,_id:0}).sort({code:1});
			//modified data
			orderCount+=6985;
			sellCount+=300;
			if(!user)
				return {success:true,data:{storeList,count:{storeCount,sheetCount,sellCount,orderCount}}};
			const seller = await UserSellModel.findOne({_id: user._id});
			if(!seller)
				return {success:true,data:{storeList,count:{storeCount,sheetCount,sellCount,orderCount},user:{_id:user._id,name:user.name,infoEnter:user.infoEnter,seller:false}}};
			return {success:true,data:{storeList,count:{storeCount,sheetCount,sellCount,orderCount},user:{_id:user._id,name:user.name,infoEnter:user.infoEnter,seller:true}}};
		}
		catch(err)
		{
			return {success:false,msg:['เกิดข้อผิดพลาด กรุณาลองใหม่','Something went wrong, please try again']};
		}
	},
	getSellerHome: async(user) => {
		try{
			//some data
			if(!user)
				return {success:true,data:{seller:false}};
			const seller = await UserSellModel.findOne({_id: user._id});
			if(!seller)
				return {success:true,data:{seller:false,user:{_id:user._id,name:user.name,infoEnter:user.infoEnter}}};
			return {success:true,data:{seller:true,user:{_id:user._id,name:user.name,infoEnter:user.infoEnter}}};
		}
		catch(err)
		{
			return {success:false,msg:['เกิดข้อผิดพลาด กรุณาลองใหม่','Something went wrong, please try again']};
		}
	},
	getSellerRegister: async(user) => {
		try{
			//some data
			if(!user)
				return {success:true,data:{}};
			const seller = await UserSellModel.findOne({_id: user._id});
			if(!seller)
				return {success:true,data:{user:{_id:user._id,name:user.name,infoEnter:user.infoEnter,seller:false}}};
			return {success:true,data:{user:{_id:user._id,name:user.name,infoEnter:user.infoEnter,seller:true}}};
		}
		catch(err)
		{
			return {success:false,msg:['เกิดข้อผิดพลาด กรุณาลองใหม่','Something went wrong, please try again']};
		}
	},
	getShop: async(user) => {
		try{
			//some data
			var store=await StoreModel.find({hidden:false},{short:1,color:1,code:1,name:1}).sort({code:1});
			if(!user)
				return {success:true,data:{store:0,storeList:store}};
			return {success:true,data:{user:{_id:user._id,name:user.name,infoEnter:user.infoEnter,seller:false},store:user.defaultStore,storeList:store}};
		}
		catch(err)
		{
			return {success:false,msg:['เกิดข้อผิดพลาด กรุณาลองใหม่','Something went wrong, please try again']};
		}
	},
	getCart: async(user,cart) => {
		try{
			//some data
			if(cart.length>500)
				return {success:false,msg:['เกิดข้อผิดพลาด กรุณาลองใหม่','Something went wrong, please try again']};
			const uniqueCart = [...new Set(cart.map(obj => obj))];
			var finalCart=[];
			var idCart=[];
			for(var i=0;i<uniqueCart.length;i++)
			{
				try {
					var own=false;
					var sheet = await SheetModel.findOne({_id:mongoose.Types.ObjectId(uniqueCart[i]),status:4,visible:true},'_id name price authorCode author');
					if(user) {
						own = await OwnsheetModel.findOne({sheet:sheet._id,facebookID:user.facebookID});
						if(user.facebookID===sheet.author)
							own=true;
					}
					if(sheet&&!own) {
						finalCart.push(sheet);
						idCart.push(sheet._id);
					}
				}catch(err){}
			}
			if(!user)
				return {success:true,data:{cart:finalCart,updCart:idCart}};
			return {success:true,data:{user:{_id:user._id,name:user.name,infoEnter:user.infoEnter,seller:false},cart:finalCart,updCart:idCart}};
		}
		catch(err)
		{
			return {success:false,msg:['เกิดข้อผิดพลาด กรุณาลองใหม่','Something went wrong, please try again']};
		}
	},
	ownSheet: async(user,sheetID) => {
		try{
			var oid = mongoose.Types.ObjectId(sheetID);
			var sheet = await SheetModel.findOne({_id:oid,status:4,visible:true},'-status -visible -searchQuery');
			if(!sheet)
				return {success:false,msg:['ไม่พบชีท','Sheet not found']};
			if(!user)
				return {success:true};
			var own = await OwnsheetModel.findOne({sheet:oid,facebookID:user.facebookID});
			if(own||sheet.author===user.facebookID)
				return {success:false};
			return {success:true};
		}
		catch(err)
		{
			return {success:false,msg:['เกิดข้อผิดพลาด กรุณาลองใหม่','Something went wrong, please try again']};
		}
	},
	checkPaid: async(id) => {
		try{
			var order = await OrderModel.findOne({_id:mongoose.Types.ObjectId(id)},'_id sheets price created facebookID paid');
			if(!order)
				return {success:false};
			if(!order.paid)
				return {success:false};
			return {success:true};
		}
		catch(err)
		{
			return {success:false,msg:['เกิดข้อผิดพลาด กรุณาลองใหม่','Something went wrong, please try again']};
		}
	},
	slipVerify: async(qr) => {
		try{
			var bank = qr.substring(18,21);
			var tidLength = parseInt(qr.substring(23,25));
			var tid = qr.substring(25,25+tidLength);
			var options = {
				method: 'POST',
				uri: process.env.SCB_AUTH_URL,
				body: {
					applicationKey : process.env.SCB_APP_KEY,
					applicationSecret : process.env.SCB_APP_SECRET
				},
				json: true,
				headers: {
					requestUId:Date.now().toString(),
					resourceOwnerId: process.env.SCB_APP_KEY
				}
			};
			var response = await request(options);
			var token = response.data.accessToken;
			var tokenType = response.data.tokenType;
			
			options = {
				method: 'GET',
				uri: process.env.SCB_SLIP_URL+'/'+tid+'?sendingBank='+bank,
				json: true,
				headers: {
					requestUId: Date.now().toString(),
					resourceOwnerId: process.env.SCB_APP_KEY,
					authorization:tokenType + ' ' + token
				}
			};
			response = await request(options);
			if(response.status.code!=1000)
				return {success:false,msg:['เกิดข้อผิดพลาด กรุณาลองใหม่','Something went wrong, please try again']};
			var b32 = response.data.ref1;
			while(b32.length<24)
				b32 += '=';
			var orderID = byteToHexString(base32.decode.asBytes(b32));
			var oid = mongoose.Types.ObjectId(orderID);
			var order = await OrderModel.findOne({_id:oid});
			if(!order)
				return {success:false};
			if(order.paid)
				return {success:false};
			Util.sendUserSheets(order);
			await OrderModel.updateOne({_id:oid},{$set:{
				paid:true,
			}});
			return {success:true};
		}
		catch(err)
		{
			return {success:false,msg:['เกิดข้อผิดพลาด กรุณาลองใหม่','Something went wrong, please try again']};
		}
	},
	botInfo: async(req,sheetID) => {
		try{
			var oid = mongoose.Types.ObjectId(sheetID);
			var sheet = await SheetModel.findOne({_id:oid,status:4,visible:true},'-status -visible -searchQuery');
			if(!sheet)
				return 'ไม่พบชีท';
			var category=['ทั้งเทอม','มิดเทอม','ไฟนอล'];
			var html  = '<!doctype html>';
			html += '<html>';
			html += '<head>';
			html += '<meta name="author" content="'+sheet.authorCode+'"/>';
			html += '<meta property="og:title" content="'+sheet.name+' By '+sheet.authorCode+'"/>';
			html += '<meta property="og:description" content="'+category[sheet.category]+' '+sheet.semester+'/'+sheet.year+'"/>';
			html += '<meta property="og:image" content="'+'https://moresheet.s3-ap-southeast-1.amazonaws.com/sheets/'+sheetID+'/cover.jpg'+'"/>';
			html += '<meta http-equiv="refresh" content="0;url=https://' + req.get('host') + req.originalUrl+'">';
			html += '</head>';
			html += '<body></body>';
			html += '</html>';
			return html;
		}
		catch(err)
		{
			return 'ไม่พบชีท';
		}
	},
	confirmPayment: async(param) => {
		try{
			var ret = {
				resCode: '00',
				resDesc: 'success',
				transactionId: param.transactionId,
			};
			
			var b32 = param.billPaymentRef1;
			while(b32.length<24)
				b32 += '=';
			var orderID = byteToHexString(base32.decode.asBytes(b32));
			var oid = mongoose.Types.ObjectId(orderID);
			var order = await OrderModel.findOne({_id:oid});
			if(!order)
				return ret;
			if(order.paid)
				return ret;
			Util.sendUserSheets(order);
			await OrderModel.updateOne({_id:oid},{$set:{
				paid:true,
				payerAccountNumber: param.payerAccountNumber,
				sendingBankCode: param.sendingBankCode,
				payerName: param.payerName,
				paidTime: param.transactionDateandTime,
			}});
			return ret;
		}
		catch(err)
		{
			return {success:false,msg:['เกิดข้อผิดพลาด กรุณาลองใหม่','Something went wrong, please try again']};
		}
	},
	logStanger: async(param) => {
		try{
			await StrangerModel.create({email:param.email})
			return {success:true};
		}
		catch(err)
		{
			return {success:false,msg:['เกิดข้อผิดพลาด กรุณาลองใหม่','Something went wrong, please try again']};
		}
	},
};