<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{
    function Register(Request $request)
    {
         if (env('APP_ENV') === 'local') {
            $dbHost = 'localhost';
            $dbName = 'react-laravel';
            $dbUsername = 'root';
            $dbPassword = '';
        }
        // JAWS_DB configuration
        else {
            $url = parse_url(getenv("JAWSDB_URL"));
            $dbHost = 'l6glqt8gsx37y4hs.cbetxkdyhwsb.us-east-1.rds.amazonaws.com';
            $dbName   = 'qyfwemmp6q4rg61z';
            $dbUsername = 'z6gnyc6fzp5kw78s';
            $dbPassword = 'lywpj5okvosdlrp2';
        }

        // database connection
        $db = new \PDO("mysql:host={$dbHost};dbname={$dbName}", $dbUsername, $dbPassword);
        $db->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);

        $user = User::firstOrCreate(
            ['email' => $request->email],
            ['name' => $request->name, 'password' => Hash::make($request->password)]
        );

        $token = $user->createToken('authToken')->accessToken;

        return response(['user' => $user, 'access_token' => $token]);
    }

    function Login(Request $request)
    {
         if (env('APP_ENV') === 'local') {
            $dbHost = 'localhost';
            $dbName = 'react-laravel';
            $dbUsername = 'root';
            $dbPassword = '';
        }
        // JAWS_DB configuration
        else {
            $url = parse_url(getenv("JAWSDB_URL"));
            $dbHost = 'l6glqt8gsx37y4hs.cbetxkdyhwsb.us-east-1.rds.amazonaws.com';
            $dbName   = 'qyfwemmp6q4rg61z';
            $dbUsername = 'z6gnyc6fzp5kw78s';
            $dbPassword = 'lywpj5okvosdlrp2';
        }

        // database connection
        $db = new \PDO("mysql:host={$dbHost};dbname={$dbName}", $dbUsername, $dbPassword);
        $db->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);

        $validatedData = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ], [
            'email.required' => 'Please enter your email address',
            'email.email' => 'Please enter a valid email address',
            'password.required' => 'Please enter your password',
        ]);

        $user = User::where('email', $validatedData['email'])->first();

        if (!$user || !Hash::check($validatedData['password'], $user->password)) {
            return response(['error' => 'email or password not correct!'], 401);
        }

        $token = $user->createToken('authToken')->accessToken;

        return response(['user' => $user, 'access_token' => $token]);
    }
}
