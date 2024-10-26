function autoLink(text) {
    const replaceURLs = (text) => {
        return text.replace(/(?:https?|ftp):\/\/[^\s/$.?#].[^\s]*/ig, function(match) {
            return '<a href="' + match.replace("</p>", "") + '" target="_blank">' + match + '</a>';
        });
    };

    const replaceNewLines = (text) => {
        return text.replace(/\n/g, '<br>');
    };

    let result = replaceURLs(text);
    result = replaceNewLines(result);

    return result;
}
function removeQueryParamsFromUrl() {
    if (history.pushState) {
        var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname;
        window.history.pushState({path:newurl},'',newurl);
    }
}
function convertMarkdownToHTML() {

}
let howguide = atob("IyMgSGVhZGVycwoKSGVhZGVycyBpbiBNYXJrZG93biBhcmUgZGVzaWduYXRlZCBieSB1c2luZyBoYXNoIHN5bWJvbHMgKCMpLiBUaGUgbnVtYmVyIG9mIGhhc2ggc3ltYm9scyBpbmRpY2F0ZXMgdGhlIGxldmVsIG9mIHRoZSBoZWFkZXIgKGZyb20gaDEgdG8gaDYpLgoKRXhhbXBsZToKYGBgbWFya2Rvd24KIyBIZWFkZXIgMQojIyBIZWFkZXIgMgojIyMgSGVhZGVyIDMKYGBgCgpQcmV2aWV3OgojIEhlYWRlciAxCiMjIEhlYWRlciAyCiMjIyBIZWFkZXIgMwoKIyMgRW1waGFzaXMKCllvdSBjYW4gbWFrZSB0ZXh0ICoqYm9sZCoqIHVzaW5nIGRvdWJsZSBhc3Rlcmlza3Mgb3IgZG91YmxlIHVuZGVyc2NvcmVzIGFuZCBfaXRhbGljXyB1c2luZyBzaW5nbGUgYXN0ZXJpc2tzIG9yIHNpbmdsZSB1bmRlcnNjb3Jlcy4KCkV4YW1wbGU6CmBgYG1hcmtkb3duCioqQm9sZCBUZXh0KioKX0l0YWxpYyBUZXh0XwpgYGAKClByZXZpZXc6CioqQm9sZCBUZXh0KioKX0l0YWxpYyBUZXh0XwoKIyMgTGlzdHMKCk1hcmtkb3duIHN1cHBvcnRzIGJvdGggb3JkZXJlZCBhbmQgdW5vcmRlcmVkIGxpc3RzLgoKT3JkZXJlZCBMaXN0OgoxLiBJdGVtIDEKMi4gSXRlbSAyCjMuIEl0ZW0gMwoKVW5vcmRlcmVkIExpc3Q6Ci0gSXRlbSBBCi0gSXRlbSBCCi0gSXRlbSBDCgpFeGFtcGxlOgpgYGBtYXJrZG93bgoxLiBJdGVtIDEKMi4gSXRlbSAyCi0gSXRlbSBBCi0gSXRlbSBCCmBgYAoKUHJldmlldzoKMS4gSXRlbSAxCjIuIEl0ZW0gMgotIEl0ZW0gQQotIEl0ZW0gQgoKIyMgTGlua3MKCllvdSBjYW4gY3JlYXRlIGxpbmtzIGluIE1hcmtkb3duIHVzaW5nIHRoZSBmb2xsb3dpbmcgZm9ybWF0OgpgYGBtYXJrZG93bgpbTGluayBUZXh0XShVUkwpCmBgYAoKRXhhbXBsZToKYGBgbWFya2Rvd24KW01hcmtkb3duIEd1aWRlXShodHRwczovL3d3dy5leGFtcGxlLmNvbS9tYXJrZG93bi1ndWlkZSkKYGBgCgpQcmV2aWV3OgpbTWFya2Rvd24gR3VpZGVdKGh0dHBzOi8vd3d3LmV4YW1wbGUuY29tL21hcmtkb3duLWd1aWRlKQoKIyMgSW1hZ2VzCgpUbyBpbnNlcnQgaW1hZ2VzIGluIE1hcmtkb3duLCB5b3UgY2FuIHVzZSB0aGUgZm9sbG93aW5nIHN5bnRheDoKYGBgbWFya2Rvd24KIVtBbHQgVGV4dF0oSW1hZ2UgVVJMKQpgYGAKCkV4YW1wbGU6CmBgYG1hcmtkb3duCiFbTWFya2Rvd24gTG9nb10oaHR0cHM6Ly91cGxvYWQud2lraW1lZGlhLm9yZy93aWtpcGVkaWEvY29tbW9ucy80LzQ4L01hcmtkb3duLW1hcmsuc3ZnKQpgYGAKClByZXZpZXc6CiFbTWFya2Rvd24gTG9nb10oaHR0cHM6Ly91cGxvYWQud2lraW1lZGlhLm9yZy93aWtpcGVkaWEvY29tbW9ucy80LzQ4L01hcmtkb3duLW1hcmsuc3ZnKQoKIyMgQ29kZSBCbG9ja3MKClRvIGRpc3BsYXkgY29kZSBibG9ja3MgaW4gTWFya2Rvd24sIHdyYXAgdGhlIGNvZGUgd2l0aGluIHRocmVlIGJhY2t0aWNrcyAoXGApIGZvciBpbmxpbmUgY29kZSBhbmQgdGhyZWUgYmFja3RpY2tzIHdpdGggdGhlIGxhbmd1YWdlIG5hbWUgZm9yIGNvZGUgYmxvY2tzLgoKRXhhbXBsZToKYGBgbWFya2Rvd24KYGBgcHl0aG9uCnByaW50KCJIZWxsbywgV29ybGQhIikKYGBgCmBgYAoKUHJldmlldzoKYGBgcHl0aG9uCnByaW50KCJIZWxsbywgV29ybGQhIikKYGBgCgojIyBCbG9ja3F1b3RlcwoKWW91IGNhbiBjcmVhdGUgYmxvY2txdW90ZXMgdXNpbmcgdGhlIGdyZWF0ZXIgdGhhbiBzeW1ib2wgKD4pLgoKRXhhbXBsZToKYGBgbWFya2Rvd24KPiBUaGlzIGlzIGEgYmxvY2txdW90ZS4KYGBgCgpQcmV2aWV3Ogo+IFRoaXMgaXMgYSBibG9ja3F1b3RlLgoKIyMgSG9yaXpvbnRhbCBSdWxlCgpJbnNlcnQgYSBob3Jpem9udGFsIHJ1bGUgdXNpbmcgdGhyZWUgb3IgbW9yZSBoeXBoZW5zLCBhc3Rlcmlza3MsIG9yIHVuZGVyc2NvcmVzIG9uIHRoZWlyIG93biBsaW5lLgoKRXhhbXBsZToKYGBgbWFya2Rvd24KLS0tCmBgYAoKUHJldmlldzoKLS0tCgpSZW1lbWJlciwgTWFya2Rvd24gaXMgYSB2ZXJzYXRpbGUgYW5kIGVhc3ktdG8tdXNlIG1hcmt1cCBsYW5ndWFnZSBmb3IgdmFyaW91cyB0ZXh0IGZvcm1hdHRpbmcgbmVlZHMuIEVuam95IHVzaW5nIE1hcmtkb3duIGZvciBhbGwgeW91ciB3cml0aW5nIHByb2plY3RzIQoKVGhpcyBndWlkZSBzaG91bGQgaGVscCB5b3UgZ2V0IHN0YXJ0ZWQuIEhhcHB5IE1hcmtkb3duaW5nIQo=")

const md = markdownit({linkify: true, breaks:true, html:true})
function markdown2html(text){
    return md.render(text)
}
$(document).ready(()=>{
    removeQueryParamsFromUrl()
    $(".btnup").on("click",(e)=>{
        let target = $(e.target)
        let option = target.attr("option")
        console.log(option)
        $(".btnup").removeClass("selectedbtn")
        target.addClass("selectedbtn")
        $("#mainthing").children().css("display", "none")
        switch(option){
            case "edit":
                $("#maintext").css("display", "block")
                break
            case "preview":
                $("#preview").html((markdown2html($("#maintext").val())))
                $("#preview").css("display", "block")
                hljs.highlightAll()
                break
            case "how":
                $("#preview").html(markdown2html(howguide))
                $("#preview").css("display", "block")
                hljs.highlightAll()
                break
            case "editexisting":
                const currentUrl = window.location.href;
                const newUrl = currentUrl + '/edit';
                window.location.href = newUrl;
                break
            case "new":
                window.location.href = window.location.origin
                break
            case "raw":
                window.location.href = window.location.origin + window.location.pathname + "/raw";
                break
            default:
                break
        }
    })

    $("button").on("click", (e)=>{
        e.preventDefault();
    })

    if(typeof rawpastedata != "undefined"){
        $("#preview").html((markdown2html(rawpastedata)))
        $("#preview").css("display", "block")
        hljs.highlightAll()
    }
})