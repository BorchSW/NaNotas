import { Component, inject } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent {
  username: string = '';
  private auth = inject(Auth);
  private firestore = inject(Firestore);
  private router = inject(Router);

  ngOnInit() {
    user(this.auth).subscribe(async (userData) => {
      if (userData) {
        const uid = userData.uid;
        const userDoc = await getDoc(doc(this.firestore, 'users', uid));
        const userDataFromDb = userDoc.data();
        this.username = userDataFromDb?.['username'] || 'Usuario';
      }
    });
  }
  logout() {
    this.auth.signOut().then(() => {
    this.router.navigate(['/login']);
    });
  }

}
