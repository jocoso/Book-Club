"use strict";(self.webpackChunkbook_club_hub=self.webpackChunkbook_club_hub||[]).push([[661],{661:(e,r,n)=>{n.r(r),n.d(r,{default:()=>p});n(950);var t=n(284),i=n(827),a=n(121),d=n(704),s=n(453),o=n(803),u=n(355),l=n(39),c=n(707).Sw?a.useLayoutEffect:a.useEffect;var m=n(617),$=n(552);$.J1`
    mutation AddUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
                email
            }
        }
    }
`,$.J1`
    mutation LoginUser($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
                email
            }
        }
    }
`,$.J1`
    mutation UpdateUser(
        $id: ID!
        $username: String
        $email: String
        $password: String
    ) {
        updateUser(
            _id: $id
            username: $username
            email: $email
            password: $password
        ) {
            _id
            username
            email
        }
    }
`,$.J1`
    mutation Deleteuser($id: ID!) {
        deleteUser(_id: $id)
    }
`,$.J1`
    mutation UpdatePassword(
        $id: ID!
        $lastPassword: String!
        $newPassword: String!
    ) {
        updatePassword(
            _id: $id
            lastPassword: $lastPassword
            newPassword: $newPassword
        ) {
            _id
            username
            email
        }
    }
`,$.J1`
    mutation UpdateUsername($id: ID!, $newUserName: String!) {
        updateUsername(_id: $id, newUserName: $newUserName) {
            _id
            username
            email
        }
    }
`,$.J1`
    mutation UpdateEmail($id: ID!, $newEmail: String!) {
        updateEmail(_id: $id, newEmail: $newEmail) {
            _id
            username
            email
        }
    }
`;const v=$.J1`
    mutation AddFriend($userid: ID!, $friendId: ID!) {
        addFriend(user_id: $userId, friend_Id: $friendId) {
            _id
            username
            friends {
                _id
                username
            }
        }
    }
`;var g=n(414);const p=()=>{const{loading:e,error:r,data:n}=(0,t.IT)(m.em),[$]=function(e,r){var n=(0,l.m)(null===r||void 0===r?void 0:r.client);(0,o.D$)(e,o.KG.Mutation);var t=a.useState({called:!1,loading:!1,client:n}),m=t[0],$=t[1],v=a.useRef({result:m,mutationId:0,isMounted:!0,client:n,mutation:e,options:r});c((function(){Object.assign(v.current,{client:n,options:r,mutation:e})}));var g=a.useCallback((function(e){void 0===e&&(e={});var r=v.current,n=r.options,t=r.mutation,a=(0,i.Cl)((0,i.Cl)({},n),{mutation:t}),o=e.client||v.current.client;v.current.result.loading||a.ignoreResults||!v.current.isMounted||$(v.current.result={loading:!0,error:void 0,data:void 0,called:!0,client:o});var l=++v.current.mutationId,c=(0,d.l)(a,e);return o.mutate(c).then((function(r){var n,t,i=r.data,a=r.errors,d=a&&a.length>0?new u.K4({graphQLErrors:a}):void 0,m=e.onError||(null===(n=v.current.options)||void 0===n?void 0:n.onError);if(d&&m&&m(d,c),l===v.current.mutationId&&!c.ignoreResults){var g={called:!0,loading:!1,data:i,error:d,client:o};v.current.isMounted&&!(0,s.L)(v.current.result,g)&&$(v.current.result=g)}var p=e.onCompleted||(null===(t=v.current.options)||void 0===t?void 0:t.onCompleted);return d||null===p||void 0===p||p(r.data,c),r})).catch((function(r){var n;if(l===v.current.mutationId&&v.current.isMounted){var t={loading:!1,error:r,data:void 0,called:!0,client:o};(0,s.L)(v.current.result,t)||$(v.current.result=t)}var i=e.onError||(null===(n=v.current.options)||void 0===n?void 0:n.onError);if(i)return i(r,c),{data:void 0,errors:r};throw r}))}),[]),p=a.useCallback((function(){if(v.current.isMounted){var e={called:!1,loading:!1,client:v.current.client};Object.assign(v.current,{mutationId:0,result:e}),$(e)}}),[]);return a.useEffect((function(){var e=v.current;return e.isMounted=!0,function(){e.isMounted=!1}}),[]),[g,(0,i.Cl)({reset:p},m)]}(v);if(e)return(0,g.jsx)("p",{children:"Loading..."});if(r)return(0,g.jsxs)("p",{children:["Error: ",r.message]});return(0,g.jsx)("div",{children:(0,g.jsx)("ul",{children:n.users.map((e=>(0,g.jsxs)("li",{children:[e.username," - ",e.email,(0,g.jsx)("button",{onClick:()=>{return r="loggedInUserId",n=e._id,void $({variables:{userId:r,friendId:n}}).then((e=>{console.log("Friend added:",e.data.addFriend)})).catch((e=>{console.error("Error adding friend:",e)}));var r,n},children:"Add Friend"})]},e._id)))})})}}}]);