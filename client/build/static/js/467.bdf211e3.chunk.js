"use strict";(self.webpackChunkbook_club_hub=self.webpackChunkbook_club_hub||[]).push([[467],{467:(e,i,s)=>{s.r(i),s.d(i,{default:()=>d});s(950);var o=s(74),r=s(284),l=s(552);l.J1`
    query getBooks {
        books {
            isbn
            title
            author
            description
            image
            blob
        }
    }
`;const t=l.J1`
    query Books($limit: Int) {
        books(limit: $limit) {
            _id
            isbn
            title
            author
            description
            image
            blob
        }
    }
`;var n=s(414);const c=e=>{let{book:i}=e;return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("h3",{children:i.title}),(0,n.jsx)("p",{children:i.author}),(0,n.jsx)("p",{children:i.description}),i.image&&(0,n.jsx)("img",{src:i.image,alt:i.title})]})},h=()=>{const{loading:e,error:i,data:s}=(0,r.IT)(t,{variables:{limit:10}});return e?(0,n.jsx)("p",{children:"Loading..."}):i?(0,n.jsxs)("p",{children:["Error: ",i.message]}):(0,n.jsx)("div",{children:(0,n.jsx)("ul",{children:s.books.map((e=>(console.log(e),(0,n.jsx)("li",{children:(0,n.jsx)("a",{href:"/community",children:(0,n.jsx)(c,{book:e})})},e._id))))})})},d=()=>(0,n.jsxs)("div",{children:[(0,n.jsx)("h1",{children:"Welcome to the Book Club Hub"}),(0,n.jsx)("p",{children:"Your ultimate platform for book clubs!"}),(0,n.jsx)(o.N_,{to:"/users",children:"View All Users"})," ",(0,n.jsx)("h1",{children:"Latest Books"}),(0,n.jsx)(h,{})]})}}]);