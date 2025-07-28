import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '.././services/auth.service';
import { RouterModule } from '@angular/router';
import { Firestore, collection, query, where, getDocs, doc, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class RegisterComponent {
  form: FormGroup;

constructor(
  private fb: FormBuilder,
  private authService: AuthService,
  private firestore: Firestore,
  private router: Router
) {
  this.form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    username: ['', [Validators.required]]
  });
}


async register() {
  if (this.form.valid) {
    const { email, password, username } = this.form.value;

    // 1. Verifica si el username ya existe
    const usersRef = collection(this.firestore, 'users');
    const q = query(usersRef, where('username', '==', username));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      alert('El nombre de usuario ya está en uso.');
      return;
    }

    try {
      // 2. Crea el usuario con email y password
      const userCredential = await this.authService.register(email, password);
      const uid = userCredential.user.uid;

      // 3. Guarda datos del usuario en Firestore
      await setDoc(doc(this.firestore, 'users', uid), {
        username,
        email,
        createdAt: new Date()
      });

      // 4. Redirige al home
      alert('Usuario registrado correctamente');
      this.router.navigate(['/home']);

    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        alert('Ese correo ya está registrado.');
      } else {
        alert('Error al registrar: ' + err.message);
      }
    }
  }
}

}
