module.exports=[54799,(a,b,c)=>{b.exports=a.x("crypto",()=>require("crypto"))},87127,a=>{"use strict";var b={0:8203,1:8204,2:8205,3:8290,4:8291,5:8288,6:65279,7:8289,8:119155,9:119156,a:119157,b:119158,c:119159,d:119160,e:119161,f:119162},c={0:8203,1:8204,2:8205,3:65279},d={0:String.fromCodePoint(c[0]),1:String.fromCodePoint(c[1]),2:String.fromCodePoint(c[2]),3:String.fromCodePoint(c[3])},e=[,,,,].fill(String.fromCodePoint(c[0])).join("");Object.fromEntries(Object.entries(d).map(a=>[a[1],+a[0]])),Object.fromEntries(Object.entries(b).map(a=>a.reverse()));var f=`${Object.values(b).map(a=>`\\u{${a.toString(16)}}`).join("")}`,g=RegExp(`[${f}]{4,}`,"gu");a.s(["isRecord",0,function(a){return"object"==typeof a&&null!==a&&!Array.isArray(a)},"stegaClean",0,function(a){var b,c;return a&&JSON.parse({cleaned:(b=JSON.stringify(a)).replace(g,""),encoded:(null==(c=b.match(g))?void 0:c[0])||""}.cleaned)},"y",0,function(a,b,c="auto"){return!0===c||"auto"===c&&(!(!Number.isNaN(Number(a))||/[a-z]/i.test(a)&&!/\d+(?:[-:\/]\d+){2}(?:T\d+(?:[-:\/]\d+){1,2}(\.\d+)?Z?)?/.test(a))&&Date.parse(a)||function(a){try{new URL(a,a.startsWith("/")?"https://acme.com":void 0)}catch{return!1}return!0}(a))?a:`${a}${function(a){let b=JSON.stringify(a),c=new TextEncoder().encode(b),f="";for(let a=0;a<c.length;a++){let b=c[a];f+=d[b>>6&3]+d[b>>4&3]+d[b>>2&3]+d[3&b]}return e+f}(b)}`}])},3071,a=>{"use strict";a.s(["APP_URL",0,"http://localhost:3001","CURRENCY_SYMBOL",0,"₹","ORDER_STATUSES",0,[{value:"pending",label:"Pending",color:"bg-yellow-500"},{value:"confirmed",label:"Confirmed",color:"bg-blue-500"},{value:"processing",label:"Processing",color:"bg-purple-500"},{value:"shipped",label:"Shipped",color:"bg-indigo-500"},{value:"delivered",label:"Delivered",color:"bg-green-500"},{value:"cancelled",label:"Cancelled",color:"bg-red-500"}],"WHATSAPP_NUMBER",0,"919746807689"])},91569,a=>{"use strict";var b=a.i(85325),c=a.i(80376),d=a.i(37936),e=a.i(64985),f=a.i(9307),g=a.i(3071);function h(a,b){let c=b||g.WHATSAPP_NUMBER,d=encodeURIComponent(a);return`https://wa.me/${c}?text=${d}`}function i(){let a=new Date().getFullYear(),b=Math.floor(1e4*Math.random()).toString().padStart(4,"0");return`LX-${a}-${b}`}var j=a.i(53112);let k=j.z.object({name:j.z.string().min(2,"Name is required"),phone:j.z.string().min(10,"Valid phone number is required"),address:j.z.string().min(5,"Address is required"),email:j.z.string().email("Invalid email").optional().or(j.z.literal(""))});j.z.object({rating:j.z.number().min(1).max(5),title:j.z.string().min(3,"Title is required"),comment:j.z.string().min(10,"Review must be at least 10 characters")});var l=a.i(43105);async function m(a){var b,c,d,j;let m=k.safeParse(a.customer);if(!m.success)return{error:m.error.issues[0].message};let n=`${g.APP_URL}/products/${a.slug}`,o=(b=a.productName,c=a.price,d=a.quantity,j=m.data,`Hello,

I would like to purchase the following product:

Product Name:
${b}

Price:
₹${c.toLocaleString("en-IN")}

Quantity:
${d}

Product URL:
${n}

Customer Details:

Name:
${j.name}

Phone:
${j.phone}

Address:
${j.address}

Please confirm availability.

Thank you.`),p=i(),q=await (0,f.getSession)(),r={_type:"orderRequest",orderNumber:p,user:q?{_type:"reference",_ref:q.id}:void 0,customer:m.data,items:[{productId:a.slug,productName:a.productName,price:a.price,quantity:a.quantity,subtotal:a.price*a.quantity,productUrl:n}],totalItems:a.quantity,grandTotal:a.price*a.quantity,status:"pending",type:"single",whatsappMessage:o};return e.isSanityConfigured?await e.sanityWriteClient.create(r):l.mockOrders.unshift({_id:`order-${Date.now()}`,orderNumber:p,customer:m.data,items:r.items,totalItems:a.quantity,grandTotal:a.price*a.quantity,status:"pending",type:"single",_createdAt:new Date().toISOString()}),{success:!0,whatsappUrl:h(o),orderNumber:p}}async function n(a,b){var c;let d,j,m;if(0===a.length)return{error:"Cart is empty"};let n=k.safeParse(b);if(!n.success)return{error:n.error.issues[0].message};let o=(c=n.data,d=a.map((a,b)=>`${b+1}. ${a.name}
   Price: ₹${a.price.toLocaleString("en-IN")}
   Qty: ${a.quantity}
   Subtotal: ₹${(a.price*a.quantity).toLocaleString("en-IN")}`).join("\n\n"),j=a.reduce((a,b)=>a+b.quantity,0),m=a.reduce((a,b)=>a+b.price*b.quantity,0),`Hello,

I would like to order the following items:

---

${d}

---

Total Items: ${j}
Grand Total: ₹${m.toLocaleString("en-IN")}

Customer Details

Name:
${c.name}

Phone:
${c.phone}

Address:
${c.address}

Please confirm availability and delivery details.

Thank you.`),p=i(),q=await (0,f.getSession)(),r=a.map(a=>({productId:a.productId,productName:a.name,price:a.price,quantity:a.quantity,subtotal:a.price*a.quantity,productUrl:`${g.APP_URL}/products/${a.slug}`})),s=a.reduce((a,b)=>a+b.quantity,0),t=a.reduce((a,b)=>a+b.price*b.quantity,0),u={_type:"orderRequest",orderNumber:p,user:q?{_type:"reference",_ref:q.id}:void 0,customer:n.data,items:r,totalItems:s,grandTotal:t,status:"pending",type:"cart",whatsappMessage:o};return e.isSanityConfigured?await e.sanityWriteClient.create(u):l.mockOrders.unshift({_id:`order-${Date.now()}`,orderNumber:p,customer:n.data,items:r,totalItems:s,grandTotal:t,status:"pending",type:"cart",_createdAt:new Date().toISOString()}),{success:!0,whatsappUrl:h(o),orderNumber:p}}async function o(a,b){if(e.isSanityConfigured)await e.sanityWriteClient.patch(a).set({status:b}).commit();else{let c=l.mockOrders.find(b=>b._id===a);c&&(c.status=b)}return{success:!0}}(0,a.i(13095).ensureServerEntryExports)([m,n,o]),(0,d.registerServerReference)(m,"400e1bff25bfc2236709b0aa56317dc388b75733b5",null),(0,d.registerServerReference)(n,"609c4b6478dcf2f704c6a627583afe1faa7573a1fd",null),(0,d.registerServerReference)(o,"60e809cd53b62541b4cedd709e9f002363f302177f",null),a.s([],80044),a.i(80044),a.s(["00a1cce70b181c241e8591d8b0fb9b8aa0550ede23",()=>c.getCurrentUser,"00ae4e671e52a9286b2506bdefd7d8a6109480e434",()=>b.$$RSC_SERVER_ACTION_0,"00bfe0739669dad8a49100dc63785a7ff61f674d38",()=>c.logoutAction,"4093aba2e9c105872fe17e563a74f6b74159c60f26",()=>c.adminLoginAction,"60e809cd53b62541b4cedd709e9f002363f302177f",0,o],91569)},9489,a=>{a.v(b=>Promise.all(["server/chunks/ssr/node_modules_@sanity_client_dist__chunks-es_stegaEncodeSourceMap_1wffdy6.js"].map(b=>a.l(b))).then(()=>b(14025)))},76016,a=>{a.v(b=>Promise.all(["server/chunks/ssr/[root-of-the-server]__0l_42p6._.js"].map(b=>a.l(b))).then(()=>b(12374)))}];

//# sourceMappingURL=%5Broot-of-the-server%5D__0jpeuui._.js.map