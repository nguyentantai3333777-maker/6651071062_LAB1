const $=s=>document.querySelector(s),vnd=n=>n.toLocaleString("vi-VN")+"đ";
let cart=JSON.parse(localStorage.getItem("cart")||"{}");
const save=()=>{localStorage.setItem("cart",JSON.stringify(cart));hdr()};
const tot=()=>Object.entries(cart).reduce((s,[i,q])=>s+PRODUCTS[i-1].price*q,0),cnt=()=>Object.values(cart).reduce((a,b)=>a+b,0);
function ting(){try{const a=new AudioContext(),o=a.createOscillator(),g=a.createGain();o.connect(g);g.connect(a.destination);o.frequency.value=880;g.gain.setValueAtTime(.2,a.currentTime);g.gain.exponentialRampToValueAtTime(.001,a.currentTime+.3);o.start();o.stop(a.currentTime+.3)}catch(e){}}
function toast(m){const t=$(".toast");t.textContent=m;t.style.display="block";setTimeout(()=>t.style.display="none",1800)}
function add(id,q=1){cart[id]=(cart[id]||0)+q;save();ting();toast("Đã thêm "+PRODUCTS[id-1].name+" vào giỏ hàng!")}
function card(p){return `<div class="pi">
<div class="im">
<a href="shop-details.html?id=${p.id}">
<img src="${p.img}" alt="${p.name}">
</a>
<div class="ac">
<a title="Yêu thích">♥</a>
<a href="shop-details.html?id=${p.id}">👁</a>
<a onclick="add(${p.id})">🛒</a>
</div>
</div>
<h6>
<a href="shop-details.html?id=${p.id}">${p.name}</a>
</h6>
<h5>${vnd(p.price)}</h5>
</div>`}
function mini(p){return `<a class="mi" href="shop-details.html?id=${p.id}">
<img src="${p.img}">
<div>
<h6>${p.name}</h6>
<span class="g">
<b>${vnd(p.price)}</b>
</span>
</div>
</a>`}
const NAV=[["index.html","Trang chủ"],["shop-grid.html","Cửa hàng"],["#","Trang"],["blog.html","Tin tức"],["contact.html","Liên hệ"]];
function hdr(){const pg=document.body.dataset.page;$("#hdr").innerHTML=`<div class="top">
<div class="c">
<span>✉ banhmientay@gmail.com &nbsp;|&nbsp; Miễn phí ship đơn từ 300.000đ</span>
<span>Facebook · Zalo · Instagram &nbsp; <a href="#">Đăng nhập</a>
</span>
</div>
</div>
<div class="hd">
<div class="c">
<a href="index.html">
<img src="Images/logo.jpg" alt="logo">
</a>
<nav>
<ul>
<li>
<a href="index.html" class="${pg=="index"?"on":""}">Trang chủ</a>
</li>
<li>
<a href="shop-grid.html" class="${pg=="shop"?"on":""}">Cửa hàng</a>
</li>
<li>
<a href="#">Trang ▾</a>
<ul>
<li>
<a href="shop-details.html?id=1">Chi tiết sản phẩm</a>
</li>
<li>
<a href="shoping-cart.html">Giỏ hàng</a>
</li>
<li>
<a href="checkout.html">Thanh toán</a>
</li>
<li>
<a href="blog-details.html">Chi tiết bài viết</a>
</li>
</ul>
</li>
<li>
<a href="blog.html">Tin tức</a>
</li>
<li>
<a href="contact.html">Liên hệ</a>
</li>
</ul>
</nav>
<div class="cartb">
<a>♥ <span>0</span></a><a href="shoping-cart.html">🛒 <span>${cnt()}</span></a> Giỏ: <b>${vnd(tot())}</b>
</div>
</div>
</div>
<div class="bar">
<div class="c">
<div class="dep">
<h4>☰ Tất cả danh mục</h4>
<ul>${Object.entries(CATS).map(([k,v])=>`<li>
<a href="shop-grid.html?cat=${k}">${v}</a>
</li>`).join("")}</ul>
</div>
<form class="sr" action="shop-grid.html">
<input name="q" placeholder="Bạn cần tìm bánh gì?">
<button>TÌM KIẾM</button>
</form>
<div class="ph">☎ 0909 123 456<br>
<small style="font-weight:400">Hỗ trợ 24/7</small>
</div>
</div>
</div>
<div class="toast">
</div>`}
function ftr(){$("#ftr").innerHTML=`<div class="ft">
<div class="c">
<div class="row">
<div>
<img src="Images/logo.jpg" style="height:45px">
<ul>
<li>Địa chỉ: 12 Nguyễn Huệ, Ninh Kiều, Cần Thơ</li>
<li>Điện thoại: 0909 123 456</li>
<li>Email: banhmientay@gmail.com</li>
</ul>
</div>
<div>
<h6>Liên kết</h6>
<ul>
<li>Về chúng tôi</li>
<li>Giao hàng</li>
<li>Mua hàng an toàn</li>
<li>Chính sách bảo mật</li>
</ul>
</div>
<div>
<h6>Danh mục</h6>
<ul>${Object.entries(CATS).map(([k,v])=>`<li>
<a href="shop-grid.html?cat=${k}">${v}</a>
</li>`).join("")}</ul>
</div>
<div>
<h6>Đăng ký nhận tin</h6>
<p>Nhận ưu đãi mới nhất qua email.</p>
<input placeholder="Email của bạn"> <button class="btn" style="padding:10px 14px" onclick="toast('Cảm ơn bạn đã đăng ký!')">Gửi</button>
</div>
</div>
<div class="cp">© Bánh Miền Tây</div>
</div>
</div>`}
const q=new URLSearchParams(location.search);
function init(){hdr();ftr();const pg=document.body.dataset.page;
if(pg=="index"){const cs=Object.keys(CATS);$("#cats").innerHTML=cs.map((k,i)=>`<a class="cat" href="shop-grid.html?cat=${k}">
<img src="Images/p${PRODUCTS.find(p=>p.cat==k).id}.jpg">
<h5>${CATS[k]}</h5>
</a>`).join("");
const tb=$("#tabs");tb.innerHTML=`<a class="on" data-c="">Tất cả</a>`+cs.map(k=>`<a data-c="${k}">${CATS[k]}</a>`).join("");
const draw=c=>$("#feat").innerHTML=PRODUCTS.filter(p=>!c||p.cat==c).slice(0,8).map(card).join("");draw("");
tb.onclick=e=>{if(!e.target.dataset)return;tb.querySelectorAll("a").forEach(a=>a.classList.remove("on"));e.target.classList.add("on");draw(e.target.dataset.c)};
const L=(a,b)=>PRODUCTS.slice(a,b).map(mini).join("");$("#l1").innerHTML=L(0,3);$("#l2").innerHTML=L(10,13);$("#l3").innerHTML=L(20,23)}
if(pg=="shop"){let c=q.get("cat")||"",s=(q.get("q")||"").toLowerCase(),max=1e9,so="";$("#sc").innerHTML=`<li onclick="F('')">Tất cả</li>`+Object.entries(CATS).map(([k,v])=>`<li onclick="F('${k}')">${v}</li>`).join("");
window.F=k=>{c=k;R()};$("#pr").onchange=e=>{max=+e.target.value;R()};$("#so").onchange=e=>{so=e.target.value;R()};$("#sq").oninput=e=>{s=e.target.value.toLowerCase();R()};$("#sq").value=s;
function R(){let l=PRODUCTS.filter(p=>(!c||p.cat==c)&&p.price<=max&&p.name.toLowerCase().includes(s));if(so=="a")l.sort((a,b)=>a.price-b.price);if(so=="d")l.sort((a,b)=>b.price-a.price);$("#cn").innerHTML=`<b>${l.length}</b> sản phẩm`;$("#sg").innerHTML=l.map(card).join("")||"Không tìm thấy bánh phù hợp."}R()}
if(pg=="detail"){const p=PRODUCTS[(+q.get("id")||1)-1];document.title=p.name;$("#d").innerHTML=`<img src="${p.img}">
<div>
<h3>${p.name}</h3>
<div class="g">${"★".repeat(p.rate)+"☆".repeat(5-p.rate)} (${p.id*3+7} đánh giá)</div>
<div class="pr">${vnd(p.price)}</div>
<p>${p.desc}</p>
<br>
<input id="n" class="qty" type="number" value="1" min="1"> <button class="btn" onclick="add(${p.id},Math.max(1,+$('#n').value))">Thêm vào giỏ</button>
<ul style="margin-top:20px">
<li>Tình trạng: <b>Còn hàng</b>
</li>
<li>Danh mục: ${CATS[p.cat]}</li>
<li>Giao hàng: Trong ngày tại khu vực nội thành</li>
<li>Bảo quản: Dùng ngon nhất trong 24 giờ</li>
</ul>
</div>`;$("#rel").innerHTML=PRODUCTS.filter(x=>x.cat==p.cat&&x.id!=p.id).slice(0,4).map(card).join("")}
if(pg=="cart")drawCart();
if(pg=="checkout"){$("#os").innerHTML=Object.entries(cart).map(([i,n])=>`<li>
<span>${PRODUCTS[i-1].name} x${n}</span>
<b>${vnd(PRODUCTS[i-1].price*n)}</b>
</li>`).join("")+`<li>
<b>Tổng cộng</b>
<b class="g">${vnd(tot())}</b>
</li>`;
$("#co").onsubmit=e=>{e.preventDefault();if(!cnt())return alert("Giỏ hàng đang trống!");alert("Đặt hàng thành công! Cảm ơn "+$("#nm").value);cart={};save();location="index.html"}}
if(pg=="contact")$("#cf").onsubmit=e=>{e.preventDefault();toast("Đã gửi tin nhắn, chúng tôi sẽ phản hồi sớm!");e.target.reset()}}
function drawCart(){const e=Object.entries(cart);$("#ct").innerHTML=e.map(([i,n])=>{const p=PRODUCTS[i-1];return `<tr>
<td>
<img src="${p.img}">${p.name}</td>
<td>${vnd(p.price)}</td>
<td>
<input class="qty" type="number" min="1" value="${n}" onchange="cart[${i}]=Math.max(1,+this.value);save();drawCart()">
</td>
<td>${vnd(p.price*n)}</td>
<td>
<a style="cursor:pointer;color:#c00" onclick="delete cart[${i}];save();drawCart()">✕</a>
</td>
</tr>`}).join("")||`<tr>
<td colspan=5>Giỏ hàng trống. <a class="g" href="shop-grid.html">Mua bánh ngay</a>
</td>
</tr>`;$("#tt").textContent=vnd(tot())}
function coupon(){const v=$("#cp").value.trim().toUpperCase();if(v=="MIENTAY10"){const t=tot();$("#tt").textContent=vnd(Math.round(t*.9))+" (đã giảm 10%)"}else toast("Mã không hợp lệ")}
document.addEventListener("DOMContentLoaded",init);
