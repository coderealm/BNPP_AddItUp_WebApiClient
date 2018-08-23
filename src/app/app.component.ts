import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { IExcercise } from './IExcercise';
import { DataService } from './data.service';
import { IUserAnswer } from './IUserAnswer';
import { UserAnswer } from './UserAnswer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild('useranswer') userInput: ElementRef;
  
  ranks: {} = { 'Beginner': 0, 'Talented': 1, 'Intermediate': 2, 'Advanced': 3, 'Expert': 4 };
  title = 'additup-app';
  level: string;
  questionId: string;
  excercise: IExcercise = null;
  answer : number = 0;
  nextLevel : number = 0;
  counter: number = 0; 
  show: boolean = true;
  totalTime: number = 30;
  timeleft: number = this.totalTime;
  restart = false;

  constructor(private dataService: DataService){ 
   }

  getExercise(): void{
    if(this.excercise === null){
      this.answer = 0;
      this.dataService
                .getExcercise()
                .subscribe(data => {
                  this.excercise = data,
                  this.answer = this.excercise.firstNumber + this.excercise.secondNumber,
                  this.questionId = this.excercise.questionId,
                  this.level = this.excercise.level
                });
    }
  }
 
  ngOnInit():void  {
    this.excercise = null;
    this.getExercise();
    this.countDown();
  }

  onSubmit(useranswer: HTMLInputElement): void {
    this.timeleft = this.totalTime;
    this.counter = 0;

    if(this.answer === +useranswer.value)  {   
      this.postAnswer(+useranswer.value);
      this.delay();
      this.countDown();
     } 
     else {    
      this.show = false;
      this.restart = true;
     }
  }

  clearInputField():void{
    this.userInput.nativeElement.value  = '';
  }
  delay(){
    setTimeout(() => {
    }, 2000);
  }

  postAnswer(answer: number):void {
    let ans: IUserAnswer = new UserAnswer(this.questionId, answer);
    this.dataService.postAnswer(ans)
        .subscribe(data =>{ this.excercise = data,
          this.level = this.excercise.level,
          this.questionId = this.excercise.questionId,
          this.timeleft = this.totalTime - this.ranks[this.level],
          this.counter = this.timeleft,
          this.answer = this.excercise.firstNumber + this.excercise.secondNumber;
        });
  
        this.clearInputField();
        this.delay();
        this.countDown();
  }
  
  countDown(): void{
    setInterval(() => {
    this.counter = this.timeleft;
    this.timeleft--;
      if(this.timeleft === 0){
        this.counter = 0;
        this.show = false;
        this.restart = true;
      }
    }, 3000);
  }

  onRestart(): void {
    location.reload();
  }
}
