class CreateBookKeepings < ActiveRecord::Migration[6.0]
  def change
    create_table :book_keepings do |t|
      t.string :expense_type
      t.string :title
      t.integer :amount
      t.text :description

      t.timestamps
    end
  end
end
