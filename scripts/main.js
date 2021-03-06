console.log("Catch-us 외주 개발 (김승태, 최기현)")
var s;

$(document).ready(function(){
    $('#user-email, #user-pw').keypress(function(event){
        if(event.keyCode === 13){
            $('.login-button').click();
        }
    });
});

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        estimatePage();
    }
});

function signIn(){
    showLoading();
    email = $("#user-email")[0].value;
    password = $("#user-pw")[0].value;
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(
        function(user){
            firebase.database().ref('Users/'+user.user.uid+"/personalInfo/type")
            .on(
                'value', 
                function(snapshot) {
                    if(snapshot.val() == "Expert"){
                        console.log("전문가 로그인");
                        onLoadExpertPage();
                    }else if(snapshot.val() == "Client"){
                        console.log("의뢰인 로그인");
                        onLoadClitentPage();
                    }else if(snapshot.val() == "Admin"){
                        onLoadManagertPage();
                    }
                },
                function(error){
                    console.log("signIn second err : ", error);
                    noneLoading();
                }
            );
        },
        function(error){
            console.log("signIn first err : ", error);
            alert("이메일 혹은 비밀번호를 확인해주세요.");
            noneLoading();
        }
    );
}