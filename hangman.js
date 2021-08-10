
    let phrases,index,guess_phrase,no_of_guesses,wrong_guess,image_source,hidden_phrase='',correct_guesses,clues=0;
    let indexes=new Array();
    let wrong_guessed_letters=new Array();
    var storedItem=localStorage.getItem("storedItem");
    function giveclue()
    {
        if(clues==0 && (correct_guesses<=guess_phrase.length)&&(wrong_guess<7))
        {
            let index1=hidden_phrase.indexOf('_');
            let element=guess_phrase[index1];
            hidden_phrase = hidden_phrase.replaceAt(index1, element);
            indexes.push(index);
            document.getElementById("hidden_letters").innerHTML=hidden_phrase;
            correct_guesses++;
            freeze_input_button();

        }
        clues++;
    }
    function getdata()
    {
        var xhr=new XMLHttpRequest();
        var phrases;
        var nextphrase;
        xhr.open('GET','hangman.json',true);
        xhr.responseType='text';
        index=Math.floor((Math.random() *9) + 1);
        xhr.onload=function()
        {
            if(xhr.status==200)
            {
                var data=JSON.parse(xhr.responseText);
                phrases=data[0].Phrases;
                console.log(phrases[index]);
                generatephrases(phrases[index]);
            }
        
        }

        xhr.send();
    }
    function generatephrases(guess_phrase)
    {
        no_of_guesses=0;
        wrong_guess=0;
        hidden_phrase='';
        correct_guesses=0;
        guess_phrase=guess_phrase.toLocaleUpperCase();
        localStorage.setItem("storedItem",guess_phrase);
        //index=Math.floor((Math.random() *9) + 1);
        //phrases=phrasescontent[0].phraseslist;
        //console.log(phrases);
        //phrases=['A hot potato','A penny for your thoughts','Actions speak louder than words','Add insult to injury','At the drop of a hat','Back to the drawing board','Ball is in your court','Barking up the wrong tree','Be glad to see the back of','Beat around the bush'];
        //guess_phrase=phrases[index];
        

        for(var i=0;i<guess_phrase.length;i++)
        {
            if(guess_phrase[i]==' ')
            {
                hidden_phrase+='\t';
                correct_guesses++;
            }
            else
            {
                hidden_phrase+='_';
            }
        }
        document.getElementById('hidden_letters').innerHTML=hidden_phrase;
        getstored();

    }
    function getstored()
    {
        guess_phrase=localStorage.getItem("storedItem");
     
        
    
    }
    function freeze_input_button()
    {
        if(wrong_guess>=7||(correct_guesses>=guess_phrase.length))
        {
            document.getElementById("inputbox").readOnly = true;
            document.getElementById("addbtn").disabled = true;
        }
    }
    function wrong_inputs()
    {
        
        wrong_guess++;
        if(wrong_guess<=7)
        {
            image_source=`../images/hangman${wrong_guess.toString()}.jpg`;
            document.getElementById("image").src=image_source;
        }

        if(wrong_guess>=7)
        {
            freeze_input_button();
            let str=`You have been hanged\nCorrect phrase is ${guess_phrase}\nTotal Number of wrong guesses are ${wrong_guess}`;
            alert(str);
        }

    }
    function Addelement()
    {
        let letter=document.getElementById("inputbox").value;
        let ascii_value=letter.charCodeAt(0);
        let check=false;
        
        if((ascii_value>=65&&ascii_value<=90)||(ascii_value>=97&&ascii_value<=122))
        {
            check=true;
        }
        else
        {
            check=false;
        }
        if(check==false)
        {
            alert("Not an alphabet\nPlease enter a alphabet!!");
        }
        else
        {
            
            replace_letter(letter);

        }
       
    }
    function replace_letter(letter)
    {
        let check=false;
        let index=-1;
        
        let guessed=-1;
        for(var i=0;i<guess_phrase.length;i++)
        {
            if(guess_phrase[i]==letter.toLocaleUpperCase())
            {
                if(indexes.includes(i)==false)
                {
                    check=true;
                    index=i;
                    guessed=-1;
                    break;
                }
                else
                {
                    guessed=1;   
                }
                
            }
        }
        if(index==-1)
        {
            check=false;
        }
        else
        {
            check=true;
            
        }
        
        
        if(guessed==1)
        {
            let str=`${letter} is already guessed`;
            alert(str);
        }
        if(check==true)
        {
            
            //hidden_phrase[index]=letter;
            //alert(hidden_phrase+"\t"+letter);
            if(hidden_phrase[index]=='_')
            {
                hidden_phrase = hidden_phrase.replaceAt(index, letter);
                indexes.push(index);
                document.getElementById("hidden_letters").innerHTML=hidden_phrase;
                correct_guesses++;
                //document.getElementById("right_guess").innerHTML=correct_guesses;
                if(correct_guesses==(guess_phrase.length))
                {
                    alert("Congratulations!!\nYou have guessed all hidden letters of phrase");
                    freeze_input_button()
                }
            }
           
            

        }
        else
        {
            let str=`${letter} not in phrase\n\nTry Again!!`;
            alert(str);
            wrong_guessed_letters.push(letter);
            str=`Wrong guessed letter's array is ${wrong_guessed_letters}`;
            document.getElementById("wrong_letters").innerHTML=str;
            wrong_inputs();
        }
        document.getElementById("inputbox").value='';
    }
    String.prototype.replaceAt = function (index, char)
    {
        let a = this.split("");
        a[index] = char;
        return a.join("");
    }
