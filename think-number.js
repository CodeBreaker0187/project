var counts=0;
var random_number;
function guessnumber()
{
    let number=document.getElementById("guessed-number").value;
    //number=21;
    //document.getElementById("message-box").innerHTML=number;
    if(counts==0)
    {
        random_number=generate_random_number();
        
    }
    let show;
    if(random_number==number)
    {
        document.getElementById("message-box").style.backgroundColor="Green";
        document.getElementById("message-box").style.color="White";
        show=`You guessed the right number<br>You have had ${counts+1} guesses<br>Congratulations!!`;
        document.getElementById("message-box").innerHTML=show;
    }
    else
    {
        let max,min;
        if(random_number>number)
        {
            max=random_number;
            min=number;
        }
        else
        {
            max=number;
            min=random_number;
        }

        if((Math.abs(min-max)>=0) && (Math.abs(min-max)<=10))
        {
            document.getElementById("message-box").style.backgroundColor="Red";
            document.getElementById("message-box").style.color="White";
            show=`Guessed number is within the range of 10<br>You have had ${counts+1} guesses<br>Please try again`;
            document.getElementById("message-box").innerHTML=show;
        }
        else if((Math.abs(min-max)>=11) && (Math.abs(min-max)<=30))
        {
            document.getElementById("message-box").style.backgroundColor="White";
            document.getElementById("message-box").style.color="Black";
            show=`Your Guess number is within the range of 30<br>You have had ${counts+1} guesses<br>Please try again`;
            document.getElementById("message-box").innerHTML=show;
        }
        else
        {
            document.getElementById("message-box").style.backgroundColor="Blue";
            document.getElementById("message-box").style.color="White";
            show=`Your guess is too high<br>You have had ${counts+1} guesses<br>Please try again`;
            document.getElementById("message-box").innerHTML=show;
        }
    }
    counts++;
}
function generate_random_number()
{
    let random_number=Math.floor((Math.random() * 100) + 1);
    return random_number;
}
function resetparameter()
{
    counts=0;
    document.getElementById("message-box").innerHTML='';
    document.getElementById("message-box").style.backgroundColor='transparent';
    document.getElementById("guessed-number").value='';

}