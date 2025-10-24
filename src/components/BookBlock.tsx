import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BookOpen, Upload, Search, TrendingUp, Leaf } from "lucide-react";
import booksImage from "@/assets/books-image.jpg";

const BookBlock = () => {
  const [activeTab, setActiveTab] = useState<"browse" | "donate">("browse");

  const sampleBooks = [
    { title: "Engineering Mathematics", author: "John Smith", price: "₹250", condition: "Good", image: "📘" },
    { title: "Data Structures", author: "Sarah Johnson", price: "Free", condition: "Excellent", image: "📗" },
    { title: "Physics Vol. 1", author: "Michael Brown", price: "₹180", condition: "Fair", image: "📙" },
    { title: "Computer Networks", author: "Emma Wilson", price: "₹300", condition: "Good", image: "📕" },
    { title: "Digital Electronics", author: "David Lee", price: "₹200", condition: "Excellent", image: "📔" },
    { title: "Operating Systems", author: "Lisa Chen", price: "Free", condition: "Good", image: "📓" },
  ];

  return (
    <section id="bookblock" className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ 
          backgroundImage: `url(${booksImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full mb-4">
              <BookOpen className="h-5 w-5" />
              <span className="font-semibold">BookBlock</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
              Share Knowledge, Sustain the Planet 📖
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              BookBlock enables students, readers, and organizations to donate or buy second-hand books easily, 
              reducing paper waste while helping learners access affordable resources.
            </p>
          </div>

          {/* Statistics Widget */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 animate-fade-in-up">
            {[
              { icon: BookOpen, label: "Books Donated", value: "12,450+" },
              { icon: TrendingUp, label: "Books Sold", value: "8,320+" },
              { icon: Leaf, label: "Trees Saved", value: "2,100+ 🌳" },
              { icon: Search, label: "Active Listings", value: "450+" },
            ].map((stat, index) => (
              <Card key={index} className="glass hover-lift">
                <CardContent className="p-6 text-center">
                  <stat.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center gap-4 mb-12 animate-fade-in-up">
            <Button
              variant={activeTab === "browse" ? "hero" : "outline"}
              size="lg"
              onClick={() => setActiveTab("browse")}
              className="px-8"
            >
              <Search className="mr-2 h-5 w-5" />
              Browse Books
            </Button>
            <Button
              variant={activeTab === "donate" ? "hero" : "outline"}
              size="lg"
              onClick={() => setActiveTab("donate")}
              className="px-8"
            >
              <Upload className="mr-2 h-5 w-5" />
              Donate Books
            </Button>
          </div>

          {/* Browse Books Tab */}
          {activeTab === "browse" && (
            <div className="animate-fade-in">
              {/* Search & Filters */}
              <div className="glass rounded-xl p-6 mb-8">
                <div className="flex flex-col md:flex-row gap-4">
                  <Input 
                    placeholder="Search by title, author, or subject..." 
                    className="flex-1"
                  />
                  <select className="px-4 py-2 rounded-md border border-input bg-background">
                    <option>All Genres</option>
                    <option>Engineering</option>
                    <option>Science</option>
                    <option>Literature</option>
                  </select>
                  <select className="px-4 py-2 rounded-md border border-input bg-background">
                    <option>All Conditions</option>
                    <option>Excellent</option>
                    <option>Good</option>
                    <option>Fair</option>
                  </select>
                  <Button variant="hero">
                    <Search className="mr-2 h-4 w-4" />
                    Search
                  </Button>
                </div>
              </div>

              {/* Books Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sampleBooks.map((book, index) => (
                  <Card 
                    key={index} 
                    className="glass hover-lift overflow-hidden animate-scale-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <CardContent className="p-6">
                      <div className="text-6xl mb-4 text-center">{book.image}</div>
                      <h3 className="text-lg font-bold mb-2 text-foreground">{book.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">by {book.author}</p>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-bold text-primary">{book.price}</span>
                        <span className="bg-accent/20 text-accent px-3 py-1 rounded-full text-sm">
                          {book.condition}
                        </span>
                      </div>
                      <Button variant="hero" className="w-full">
                        {book.price === "Free" ? "Request Book" : "Buy Now"}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Donate Books Tab */}
          {activeTab === "donate" && (
            <div className="animate-fade-in max-w-2xl mx-auto">
              <Card className="glass">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6 text-foreground text-center">
                    Donate Your Books
                  </h3>
                  <form className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">Book Title</label>
                      <Input placeholder="Enter book title" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">Author Name</label>
                      <Input placeholder="Enter author name" />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-foreground">Condition</label>
                        <select className="w-full px-4 py-2 rounded-md border border-input bg-background">
                          <option>Excellent</option>
                          <option>Good</option>
                          <option>Fair</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-foreground">Price</label>
                        <Input placeholder="Enter price or 'Free'" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">Upload Image</label>
                      <div className="border-2 border-dashed border-input rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                        <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-accent/10 p-4 rounded-lg">
                      <input type="checkbox" id="educational" className="rounded" />
                      <label htmlFor="educational" className="text-sm text-foreground">
                        Donate for educational causes (free for students)
                      </label>
                    </div>
                    <Button variant="hero" size="lg" className="w-full">
                      <Upload className="mr-2 h-5 w-5" />
                      Submit Book
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BookBlock;
