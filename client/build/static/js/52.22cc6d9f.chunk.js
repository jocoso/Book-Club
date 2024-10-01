"use strict";(self.webpackChunkbook_club_hub=self.webpackChunkbook_club_hub||[]).push([[52],{52:(e,r,i)=>{i.r(r),i.d(r,{default:()=>t});i(950);var s=i(284),d=i(552);const n=d.J1`
    query Clubs {
        clubs {
            _id
            description
            founder {
                _id
                username
            }
            name
            img
            posts {
                _id
                title
                content
                author {
                    _id
                    username
                }
                blob
                media
                comments {
                    _id
                    title
                    content
                    author {
                        _id
                        username
                    }
                    blob
                    createdAt
                    updatedAt
                }
            }
            memberCount
        }
    }
`;d.J1`
    query getClub($_id: ID!) {
        club(_id: $_id) {
            _id
            name
            description
            img
            founder
            members
            posts
            memberCount
        }
    }
`;var l=i(414);const u=e=>{var r;let{club:i}=e;return i=i||{error:"Club couldn't be displayed"},(0,l.jsx)(l.Fragment,{children:i.error?(0,l.jsx)("div",{children:i.error}):(0,l.jsxs)("div",{children:[(0,l.jsx)("h1",{children:i.name}),(0,l.jsx)("p",{children:i.description}),(0,l.jsxs)("p",{children:["Created by: ",i.founder.username]}),(0,l.jsx)("div",{children:(null===(r=i)||void 0===r?void 0:r.img)||"Default Image"}),(0,l.jsxs)("p",{children:["Members: ",i.memberCount]})]})})},o=()=>{const{loading:e,error:r,data:i}=(0,s.IT)(n);return e?(0,l.jsx)("p",{children:"Loading..."}):r?(0,l.jsxs)("p",{children:["Error: ",r.message]}):(0,l.jsx)("div",{children:(0,l.jsx)("ul",{children:i.clubs.map((e=>(0,l.jsx)("li",{children:(0,l.jsx)("a",{href:"/community",children:(0,l.jsx)(u,{club:e})})},e._id)))})})},t=()=>(0,l.jsxs)("div",{children:[(0,l.jsx)("h1",{children:"Communities"}),(0,l.jsx)("p",{children:"These are some of our communities"}),(0,l.jsx)(o,{})]})}}]);