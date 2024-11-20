import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';

const LabelInputGroup = ({ children }) => <div className='flex flex-col gap-2'>{children}</div>;

const Login = () => {
	return (
		<div className='w-full h-full grid place-items-center mt-20'>
			<Card className="w-1/4">
				<CardHeader>
					<CardTitle>Login</CardTitle>
					<CardDescription>Enter your credentials to continue</CardDescription>
				</CardHeader>
				<CardContent>
					<form>
                        <div className='grid w-full items-center gap-4'>
                            <LabelInputGroup>
                                <Label htmlFor="email">Email address</Label>
                                <Input type="email" id="email" name="email" placeholder="john.doe@credunity.io"/>
                            </LabelInputGroup>
                            <LabelInputGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password" placeholder="Password"/>
                            </LabelInputGroup>
                            <Button type="submit">Login</Button>
                        </div>
					</form>
                </CardContent>
                <CardFooter>
                    <small className='w-full text-center'>Don&apos;t have an account? <Link to="/register" className="text-black/80 font-medium">Register</Link></small>
                </CardFooter>
			</Card>
		</div>
	);
};

export default Login;
