<?php

use Illuminate\Database\Seeder;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->truncate();

        $users = [
             ['name' => 'alaaDragneel', 'email' => 'alaa_dragneel@yahoo.com', 'password' => bcrypt('666666')],
             ['name' => 'moaalaa', 'email' => 'moaalaa@yahoo.com', 'password' => bcrypt('666666')],
             ['name' => 'sasuke_alaa', 'email' => 'sasuke_alaa@yahoo.com', 'password' => bcrypt('666666')],
        ];

        DB::table('users')->insert($users);
    }
}
