<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function AddProduct(Request $request)
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

        $request->validate([
            'image' => 'required|image|mimes:png,jpg,jpeg|max:9999'
        ]);

        $imageName = time() . '.' . $request->image->extension();
        $request->image->move(public_path('upload/products-images'), $imageName);

        $image_url = 'upload/products-images/' . $imageName;

        Product::insert([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'file_path' => $image_url,
            'created_at' => Carbon::now()
        ]);
    }

    public function ShowProducts()
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

        $product = Product::orderBy('created_at', 'desc')->get();
        return response(['product' => $product]);
    }

    public function DeleteProduct($id)
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

        $product = Product::findOrFail($id);
        $image = $product->file_path;
        unlink($image);

        $deleted = Product::findOrFail($id)->delete();
        if ($deleted)
            return ['response' => 'Product Deleted Successfully'];
        else
            return ['response' => 'Operation Failed'];
    }


    function GetProduct($id)
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

        $product = Product::findOrFail($id);

        return response(['product' => $product]);
    }


    public function updateProduct(Request $request, $id)
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

        $validator = Validator([
            'name' => 'required',
            'price' => 'required',
            'description' => 'required',
            'image' => 'image|mimes:jpeg,png,jpg,gif|max:9999',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        //===============================================

        if ($request->file('image')) {
            $product = Product::findOrFail($id);
            $image = $product->file_path;
            unlink($image);

            $imageName = time() . '.' . $request->image->extension();
            $request->image->move(public_path('upload/products-images'), $imageName);

            $image_url = 'upload/products-images/' . $imageName;

            Product::findOrFail($id)->update([
                'name' => $request->name,
                'description' => $request->description,
                'price' => $request->price,
                'file_path' => $image_url,
                'updated_at' => Carbon::now()
            ]);
        } 
        else {
            Product::findOrFail($id)->update([
                'name' => $request->name,
                'description' => $request->description,
                'price' => $request->price,
                'updated_at' => Carbon::now()
            ]);
        }

        return response()->json(['success' => true], 200);

    }

    function Search($key){
        $product = Product::where('name','Like',"%$key%")->get();

        return response(['product' => $product]);

    }
}
