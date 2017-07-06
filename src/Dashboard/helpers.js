// // import Images from "/imports/lib/collections/images/ImagesCollection"
// // import plans from "./plans"

// // export function unpack(rows, key) {
// //   return rows.map(function(row) {
// //     return row[key]
// //   })
// // }

// // export function numberWithCommas(x) {
// //   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
// // }

// // export function fetchAnalyticsDataFromResponse(data) {
// //   // from [ date, views, duration]
// //   const result = {
// //     views: { x: [], y: [] },
// //     duration: { x: [], y: [] }
// //   }
// //   _.transform(
// //     data.rows,
// //     (result, value, key) => {
// //       result.views.x.push(getDateFromGoogle(value[0]))
// //       result.views.y.push(parseInt(value[1]))
// //       result.duration.x.push(getDateFromGoogle(value[0]))
// //       result.duration.y.push((parseInt(value[2]) / 60).toFixed(2))
// //     },
// //     result
// //   )
// //   return result
// //   // to {views:[date:'',views:''], duration:[date:'',duration:'']}
// // }
// // function getDateFromGoogle(dateString) {
// //   var year = dateString.substring(0, 4)
// //   var month = dateString.substring(4, 6)
// //   var day = dateString.substring(6, 8)
// //   // var date =
// //   // var currentDate = new Date()
// //   return new Date(year, month - 1, day)
// // }

// // export function openInNewTab(e, url) {
// //   e.preventDefault()
// //   e.stopPropagation()
// //   var win = window.open(url, "_blank")
// //   win.focus()
// // }
// // export function sentCreateAlert(user) {
// //   const id = _.get(user, "_id")
// //   const email = _.get(user, "emails[0].address")
// //   const name = _.get(user, "meta.name")
// //   const role = _.get(user, "meta.role")
// //   const link = process.env.ROOT_URL + "/account/admin/profile/" + id
// //   const data = {
// //     title: "Neuer User",
// //     header: `Neuer User - ${email}`,
// //     list: [
// //       {
// //         key: "id",
// //         value: id
// //       },
// //       {
// //         key: "email",
// //         value: email
// //       },
// //       {
// //         key: "Name",
// //         value: name
// //       },
// //       {
// //         key: "Rolle",
// //         value: role
// //       },
// //       {
// //         key: "Link",
// //         value: link
// //       }
// //     ]
// //   }
// //   Meteor.call("logEmail", data)
// //   Meteor.call("alertEmail", data)
// // }
// // export function sentPaymentAlert(user) {
// //   const id = _.get(user, "_id")
// //   const email = _.get(user, "emails[0].address")
// //   const name = _.get(user, "meta.name")
// //   const role = _.get(user, "meta.role")
// //   const activePaymentMethod = _.get(user, "meta.payment.activePaymentMethod")
// //   const activeSubscribedPlan = _.get(user, "meta.payment.activeSubscribedPlan")
// //   const subscriptionDate = new Date(
// //     _.get(user, "meta.payment.subscriptionDate")
// //   ).toLocaleString("de-DE")
// //   const coupon = _.get(user, "meta.payment.coupon")
// //   const data = {
// //     title: "Rechnung",
// //     header: `Neue Rechnung - ${email}`,
// //     list: [
// //       {
// //         key: "id",
// //         value: id
// //       },
// //       {
// //         key: "email",
// //         value: email
// //       },
// //       {
// //         key: "name",
// //         value: name
// //       },
// //       {
// //         key: "role",
// //         value: role
// //       },
// //       {
// //         key: "activePaymentMethod",
// //         value: activePaymentMethod
// //       },
// //       {
// //         key: "activeSubscribedPlan",
// //         value: activeSubscribedPlan
// //       },
// //       {
// //         key: "subscriptionDate",
// //         value: subscriptionDate
// //       },
// //       {
// //         key: "coupon",
// //         value: coupon
// //       }
// //     ]
// //   }

// //   if (activePaymentMethod === "invoice") {
// //     const iname = _.get(user, "meta.payment.invoice.name")
// //     const company = _.get(user, "meta.payment.invoice.company")
// //     const address = _.get(user, "meta.payment.invoice.address")
// //     const plz = _.get(user, "meta.payment.invoice.plz")
// //     data.list = Array.concat([], data.list, [
// //       {
// //         key: "invoice name",
// //         value: iname
// //       },
// //       {
// //         key: "invoice company",
// //         value: company
// //       },
// //       {
// //         key: "invoice address",
// //         value: address
// //       },
// //       {
// //         key: "invoice plz",
// //         value: plz
// //       }
// //     ])
// //   }

// //   Meteor.call("logEmail", data)
// //   Meteor.call("alertEmail", data)
// // }
// // export function buildUserObject(user, options, payment) {
// //   user.profile = {
// //     about: { logo: {}, images: [], testimonial: {} },
// //     contact: { image: {}, latlong: {} },
// //     services: { list: [], details: {} }
// //   }

// //   user.meta = {
// //     role: options.profile.role || "Berater",
// //     name: options.profile.name,
// //     lastUpdate: Date.now(),
// //     createdAt: Date.now(),
// //     published: false,
// //     approved: false,
// //     subscribed: false,
// //     payment
// //   }

// //   const coupon = options.profile.coupon
// //   if (coupon) user.meta.payment["coupon"] = coupon

// //   if (options.profile.role === "Anbieter")
// //     user.meta["maxTools"] = options.profile.maxTools

// //   return user
// // }
// // export function getSidebarColor(userrole) {
// //   switch (userrole) {
// //     case "Berater":
// //       return "#FF8024"
// //       break
// //     case "Anbieter":
// //       return "#697db4"
// //       break
// //     case "Mitglied":
// //       return "#53BE90"
// //       break
// //     default:
// //       return "#000"
// //   }
// // }

// // export function getPrettyPrice({ earlybird, role, maxTools }) {
// //   // console.log(earlybird, role, maxTools);
// //   let price
// //   plans.map(item => {
// //     if (role === item.name) {
// //       switch (maxTools) {
// //         case "=1":
// //           price = item.price.valueS
// //           break
// //         case "=5":
// //           price = item.price.value
// //           break
// //         case "=10":
// //           price = item.price.valueXL
// //           break
// //         default:
// //           price = item.price.value
// //           break
// //       }
// //     }
// //   })
// //   if (earlybird) {
// //     price = parseFloat(price)
// //     role === "Anbieter" ? (price -= 100) : (price -= 50)
// //     price += "€/Monat inkl. Rabatt"
// //   } else price += "/Monat"
// //   return price
// // }
// // export function getPlan({ role, maxTools }) {
// //   let plan
// //   switch (role) {
// //     case "Anbieter":
// //       if (maxTools === "=1") plan = "anbieter.=1"
// //       else if (maxTools === "=5") plan = "anbieter.=5"
// //       else if (maxTools === "=10") plan = "anbieter.=10"
// //       else plan = "anbieter.=5"
// //       break
// //     case "Berater":
// //       plan = "berater"
// //       break
// //     case "Mitglied":
// //       plan = "mitglied"
// //       break
// //     default:
// //       plan = "mitglied"
// //   }
// //   return plan
// // }
// // export function buildCustomerObject(user, meta) {
// //   const description = meta.name
// //   const email = user.emails[0].address
// //   const metadata = { id: user._id }
// //   const coupon = meta.payment.coupon
// //   const token = meta.payment.stripe

// //   let customerRequest = {
// //     description,
// //     email,
// //     metadata
// //   }

// //   if (token) customerRequest["source"] = token
// //   if (coupon) customerRequest["coupon"] = coupon

// //   return customerRequest
// // }

// // export function getActiveEigenschaftenSlugs({ toolfinder, head, prio }) {
// //   const obj = {}
// //   Object.keys(toolfinder).map(index => {
// //     if (toolfinder[index].length === 0) return
// //     if (prio && !ToolData[index].isPriority) return
// //     let attributes = ToolData[index].eigenschaften
// //     let header = ToolData[index][head || "slug"]
// //     obj[header] = []
// //     Object.keys(attributes).map(attribute => {
// //       if (toolfinder[index].includes(attribute)) {
// //         obj[header].push(ToolData[index].eigenschaften[attribute].slug)
// //       }
// //     })
// //   })
// //   return obj
// // }
export function forceHTTPS(string) {
  return string
  // if (Meteor.isDevelopment) return string
  // return string.replace("http://", "https://")
}
// export function getImageUrl(props) {
//   if (typeof props === "undefined" || !props.src) return ""
//   if (props.src.path) {
//     return forceHTTPS(props.src.path)
//   } else if (props.src.id) {
//     let src = Images.findOne(props.src.id)
//     if (typeof src === "undefined") return ""
//     if (!!src.link) return src.link()
//     return ""
//   }
//   return ""
// }
// export function windowWidth() {
//   if (Meteor.isServer) return 0
//   return (
//     window.innerWidth ||
//     document.documentElement.clientWidth ||
//     document.body.clientWidth
//   )
// }

// export function nestedIndex(array, val) {
//   let index = -1
//   array.forEach((obj, i) => {
//     Object.keys(obj).map(item => {
//       if (obj[item] === val) {
//         index = i
//         return
//       }
//     })
//   })
//   return index
// }

// export function triggerWhenResizeEnds(callback) {
//   var rtime
//   var timeout = false
//   var delta = 200
//   //ms
//   window.addEventListener("resize", function(e) {
//     rtime = new Date()
//     if (timeout === false) {
//       timeout = true
//       setTimeout(resizeend, delta)
//     }
//   })

//   function resizeend() {
//     if (new Date() - rtime < delta) {
//       setTimeout(resizeend, delta)
//     } else {
//       timeout = false
//       callback()
//     }
//   }
// }
// export function getPage(pathname) {
//   let location = pathname.split("/")
//   let page = location[1] && location[1].toUpperCase()
//   return page
// }

// export function formateDate(date) {
//   if (!date) return ""
//   date = date.substr(0, 4)
//   let year = new Date().getFullYear()
//   return parseInt(year) - parseInt(date)
// }

// export function fetchInputsDataFrom(parentNode) {
//   let data = {}

//   const elements = parentNode.querySelectorAll("input")

//   elements.forEach(({ name, value, type, checked }) => {
//     if (type !== "radio" || (type === "radio" && checked)) data[name] = value
//   })
//   return Object.assign({}, data)
// }

// export function removeStyles(elements) {
//   elements = Array.isArray(elements) ? elements : [elements]
//   elements.forEach(e => e.removeAttribute("style"))
// }

// export function inputIsEmpty(node) {
//   let isEmpty = node.input.value.length === 0
//   if (isEmpty) node.input.classList.add("fieldError")
//   else node.input.classList.remove("fieldError")
//   return isEmpty
// }

// export function countStringLenghtFromHtml(value) {
//   if (!value) return 0
//   return value.replace(/<(?:.|\n)*?>/gm, "").length
// }

// export function draftIsEmpty(node) {
//   let isEmpty = countStringLenghtFromHtml(node.state.value) === 0

//   if (isEmpty) node.input.wrapper.classList.add("fieldError")
//   else node.input.wrapper.classList.remove("fieldError")

//   return isEmpty
// }

// export function markInputBorders(field) {
//   field.classList.add("fieldError")
// }
// export function unmarkInputBorders(field) {
//   field.classList.remove("fieldError")
// }
// export function markInputParentBorders(field) {
//   field.parentNode.classList.add("fieldError")
// }
// export function unmarkInputParentBorders(field) {
//   field.parentNode.classList.remove("fieldError")
// }

// export function imgIsEmpty(img) {
//   let empty = true
//   if (img && typeof img.path === "string" && img.path.length > 0) empty = false
//   if (img && typeof img.id === "string" && img.id.length > 0) empty = false
//   return empty
// }

// export function verifyIfFieldsAreEmpty(fields) {
//   let atLeastOneFieldEmpty = false

//   for (let name in fields) {
//     // !fields[name].dataset.optional
//     if (name === "card" || name === "coupon" || name === "agb") {
//     } else if (fields[name].value.length === 0) {
//       markInputParentBorders(fields[name])
//       if (!atLeastOneFieldEmpty) atLeastOneFieldEmpty = true
//     }
//   }
//   return atLeastOneFieldEmpty
// }

// export function countWordsFromHtml(value) {
//   var regex = /\s+/gi
//   var wordCount = value.trim().replace(regex, " ").split(" ").length
//   return wordCount
// }

// export function validateEmail(email) {
//   var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,}\.[0-9]{1,}\.[0-9]{1,}\.[0-9]{1,}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//   return re.test(email)
// }

// export function verifyIfIsMobile(breakingPoint = 450) {
//   return window.innerWidth <= breakingPoint
// }

// export function clientRect(node) {
//   if (typeof node === "string") node = document.querySelector(node)

//   let rect, width, height, top, left, bottom, right

//   if (node) {
//     rect = node ? node.getBoundingClientRect() : {}

//     width = rect.width || 0
//     height = rect.height || 0
//     top = rect.top || 0
//     left = rect.left || 0
//     bottom = rect.bottom || 0
//     right = rect.right || 0
//   }

//   return { width, height, top, left, bottom, right }
// }

// export function isMouseOn(selector) {
//   return document.querySelector(selector + ":hover")
// }

// export function nameOfBrowser() {
//   var ua = window.navigator.userAgent,
//     tem,
//     M = ua.match(
//       /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
//     ) || []
//   if (/trident/i.test(M[1])) {
//     tem = /\brv[ :]+(\d+)/g.exec(ua) || []
//     return "IE " + (tem[1] || "")
//   }
//   if (M[1] === "Chrome") {
//     tem = ua.match(/\b(OPR|Edge)\/(\d+)/)
//     if (tem != null) return tem.slice(1).join(" ").replace("OPR", "Opera")
//   }
//   M = M[2]
//     ? [M[1], M[2]]
//     : [window.navigator.appName, window.navigator.appVersion, "-?"]
//   if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1])
//   return M.join(" ")
// }

// export function isSafari() {
//   if (Meteor.isServer) return false
//   return /safari/i.test(nameOfBrowser())
// }
