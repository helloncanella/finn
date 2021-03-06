import sweetAlert from "sweetalert"

if (document) {
  require("sweetalert/dist/sweetalert.css")
}

export function role() {
  return "Anbieter"
}
export function saveImage(image) {
  console.log(image)
  return { id: "123546" }
}
export function getImageUrl({ src }) {
  if (src.id)
    return "http://ste.india.com/sites/default/files/2016/02/07/458133-fernando-torres-scream-cele.jpg"
  else if (src.path) return src.path

  return "data:image/png;base64,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"
}

export function isAllowedType(file, allowedTypes) {
  const isAllowed = !!allowedTypes.filter(type => file.type.endsWith(type))
    .length

  if (!file.type || !isAllowed) {
    sweetAlert({
      title: "Format not allowed",
      text: `Use one of the following formats: ${allowedTypes.join(", ")}`,
      type: "error"
    })

    return false
  }

  return true
}

if (!String.prototype.endsWith) {
  String.prototype.endsWith = function(searchString, position) {
    var subjectString = this.toString()
    if (
      typeof position !== "number" ||
      !isFinite(position) ||
      Math.floor(position) !== position ||
      position > subjectString.length
    ) {
      position = subjectString.length
    }
    position -= searchString.length
    var lastIndex = subjectString.lastIndexOf(searchString, position)
    return lastIndex !== -1 && lastIndex === position
  }
}
