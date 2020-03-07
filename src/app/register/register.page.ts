import { Component, OnInit } from '@angular/core';
import { MyServiceService } from '../services/my-service.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor( public myService: MyServiceService, private router:Router) { }

  ngOnInit() {
  }

  register(form) {
    this.myService.register(form.value).subscribe((res) => {
      this.router.navigateByUrl('home');
    });
  }

}
