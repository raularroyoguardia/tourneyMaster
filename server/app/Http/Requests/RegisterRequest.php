<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required',
            'apellido1' => 'required',
            'apellido2' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6|confirmed',
            'telefon' => 'required|unique:users,telefon|digits:9',
            'foto_perfil' => 'required|image|max:2048',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'El nombre es obligatorio.',
            'apellido1.required' => 'El apellido paterno es obligatorio.',
            'apellido2.required' => 'El apellido materno es obligatorio.',
            'email.required' => 'El correo electrónico es obligatorio.',
            'email.email' => 'El correo electrónico no es válido.',
            'email.unique' => 'Este correo electrónico ya está registrado.',
            'telefon.required' => 'El teléfono es obligatorio.',
            'telefon.digits' => 'El teléfono debe tener exactamente 9 dígitos.',
            'telefon.unique' => 'Este teléfono ya está registrado.',
            'password.required' => 'La contraseña es obligatoria.',
            'password.min' => 'La contraseña debe tener al menos 6 caracteres.',
            'password.confirmed' => 'La confirmación de la contraseña no coincide.',
            'foto_perfil.required' => 'La foto de perfil es obligatoria.',
            'foto_perfil.image' => 'El archivo subido no es una imagen',
            'foto_perfil.max' => 'Selecciona otra imagen menos pesada'
        ];
    }
}
